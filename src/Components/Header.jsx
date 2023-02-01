import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full z-40">
      <div className="flex justify-between items-center py-6 px-9 max-sm:px-2.5">
        <div className="relative">
          <Link to="/" className="flex items-center">
            <img
              src="/task-todo-website-logo-2.png"
              className="w-16 text-center h-16 object-contain"
              alt="logo"
            />
            <h1 className="font-extrabold max-sm:hidden text-white">
              Tasks & To-do's
            </h1>
          </Link>
        </div>
        <ul className="flex space-x-6 text-white">
          <li>
            <Link
              className=" text-white font-semibold rounded-md py-2 5x-4 "
              to="/register"
            >
              Kayıt Ol
            </Link>
          </li>
          <li>
            <Link
              className=" text-white font-semibold rounded-md py-2 px-5 h-14 bg-gradient-to-r from-violet-500 to-fuchsia-500"
              to="/login"
            >
              Giriş Yap
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
