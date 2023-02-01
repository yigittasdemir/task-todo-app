import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../firebase";
import { logout as logoutHandle } from "../store/auth";
import { useNavigate } from "react-router-dom";

const Sidebar = (props) => {
  const myFunction = (e) => {
    var x = document.getElementById("toggle-menu");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  };

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/", {
      replace: true,
    });
  };

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        onClick={myFunction}
        class="inline-flex relative mx-auto z-50 items-center p-3 mt-4 ml-0 text-sm text-gray-500 rounded-lg lg:hidden xl:hidden 2xl:hidden "
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-7 h-7"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="toggle-menu"
        class="fixed top-0 left-0 max-sm:hidden max-lg:hidden z-40 w-64 h-screen"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4  bg-indigo-800 dark:bg-gray-800">
          <div
            id="user-profile"
            className="block text-center justify-center relative py-4"
          >
            {user.photoURL ? (
              <img
                className="w-28 h-28 rounded-full m-auto object-cover bg-center"
                src={user.photoURL}
                alt="user-img"
              />
            ) : (
              <div className="block text-center justify-center relative py-2">
                <img
                  className="w-28 h-28 bg-slate-400 object-cover rounded-full bg-center m-auto p-2"
                  src="/avatar.webp"
                  alt="avatar"
                />
              </div>
            )}
            <p className="pt-2 text-white">{user.displayName}</p>

            <p className="text-white">{user.email}</p>
          </div>
          <ul class="text-center pb-4 px-2 space-y-6 flex-co">
            <li>
              <Link
                to="/"
                class="flex items-center p-2 text-center font-normal bg-indigo-700  text-white justify-center  rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Anasayfa
                <span class="ml-3"></span>
              </Link>
            </li>

            <li>
              <Link
                to="/settings"
                class="flex items-center p-2 text-center font-normal bg-indigo-700  text-white justify-center  rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Profil
                <span class="ml-3"></span>
              </Link>
            </li>

            <div className="py-4 fixed w-52 bottom-0 justify-center text-center space-y-2">
              <button
                type="button"
                onClick={handleLogout}
                className="block w-full items-center rounded-md border border-transparent bg-indigo-700 px-6 py-2  text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Çıkış yap
              </button>
            </div>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
