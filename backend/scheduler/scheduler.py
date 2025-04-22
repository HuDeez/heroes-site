import logging

from apscheduler.schedulers.asyncio import AsyncIOScheduler

from api.v1.entities.news.client import NewsHTTPClient

BASE_URL = 'https://news.mail.ru/'

scheduler = AsyncIOScheduler()
logger = logging.getLogger(__name__)


async def get_news():
    async with NewsHTTPClient(base_url=BASE_URL) as client:
        await client.full_database()


async def start():
    await get_news()
    scheduler.add_job(get_news, 'interval', seconds=3600)
    scheduler.start()

