import asyncio
import datetime as dt
import logging
from math import ceil

from aiohttp import ClientSession
from async_lru import alru_cache
from bs4 import BeautifulSoup
from sqlalchemy import select, update

from api.v1.entities.news.repository import NewsRepository
from api.v1.entities.news.schema import NewsORM, NewsBase

logger = logging.getLogger(__name__)


class HTTPClient:
    def __init__(self, base_url):
        self._base_url = base_url
        self._repository = NewsRepository
        self._session = None

    async def __aenter__(self):
        self._session = ClientSession(trust_env=True)
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self._session:
            await self._session.close()

    async def _get_html(self, url: str = '', retries: int = 5):
        full_url = self._base_url + url
        for _ in range(retries):
            try:
                async with self._session.get(full_url) as response:
                    status = response.status
                    if status != 200:
                        logger.error(
                            msg=f"The response status is invalid: {status}"
                        )
                        return None

                    content = await response.text()

                    if "Ошибка 429" in content:
                        logger.error(
                            msg="Too many requests. Repeating a request..."
                        )

                        await asyncio.sleep(300)
                        continue

                    return content
            except Exception as e:
                logger.exception(
                    msg=f"Failed to get {full_url}: {e}"
                )
                return None

        logger.error(
            msg=f"Failed to get dates from {full_url} after {retries} retries"
        )
        return None

    async def _create_soup(self, url: str = ''):
        html = await self._get_html(url)
        if html is None:
            logger.error(
                msg=f"Failed to get html from {url}"
            )
            return None
        return BeautifulSoup(html, "html.parser")


class NewsHTTPClient(HTTPClient):

    async def full_database(self):
        soup = await self._create_soup('svo/')

        actual_news = soup.find_all(
            name="div",
            attrs={"data-logger": "news__FeedMainItem"},
            limit=16
        )

        for news in actual_news:
            title = news.find("h3", attrs={"data-qa": "Title"})
            description = news.find("div", attrs={"data-qa": "Text"})

            datetime_str = news.find("time")['datetime']
            datetime = dt.datetime.fromisoformat(datetime_str).strftime(
                "%d.%m %H:%M")

            try:
                image_url = news.find("img")['src']
            except TypeError:
                image_url = None

            try:

                link = title.find("a")["href"]
                article_id = int(link.split("/")[-2])
                content: str = await self._get_article_text(article_id)
            except ValueError:
                continue

            reading_time = ceil(len(content.strip().split()) // 180)

            news_model = NewsBase(
                title=title.text,
                description=description.text,
                datetime=datetime,
                reading_time=reading_time,
                image_url=image_url,
                content=content,
                article_id=article_id
            )

            await self._repository.add(news_model)
            logger.info(
                msg=f"News have been added. Article ID {article_id}"
            )

        all_news = await self._repository.get_news()
        if len(all_news) > 16:
            size = len(all_news)
            for model in all_news:
                await self._repository.delete(model.article_id)
                size -= 1

                if size == 16:
                    break

    @alru_cache()
    async def _get_article_text(self, article_id: int) -> str:
        soup = await self._create_soup(f"svo/{article_id}")
        if soup is None:
            logger.error(f"Failed to create soup for article {article_id}")
            return ""
        text_elements = soup.find_all("div", {"article-item-type": "html"})
        return "\n".join([element.text for element in text_elements])
