import { Link } from 'react-router-dom';
import '../css/Header.css';
import { IoSearchOutline } from 'react-icons/io5';

export default function Header() {
  return (
    <header className="bg-white p-2">
      <div className="container flex flex-row min-w-full justify-center p-2 gap-10 items-center">
        <ul className="menu flex flex-row gap-10 bg-[#f3f3f3] p-4 rounded-2xl">
          <li>
            <Link to="/" className="p-2">
              Главная
            </Link>
          </li>
          <li>
            <Link to="/heroes" className="p-2">
              Герои
            </Link>
          </li>
          <li>
            <Link to="/about-us" className="p-2">
              О нас
            </Link>
          </li>
          <li>
            <Link to="/contacts" className="p-2">
              Контакты
            </Link>
          </li>
        </ul>
        <button className="search cursor-pointer">
          <IoSearchOutline />
        </button>
      </div>
    </header>
  );
}
