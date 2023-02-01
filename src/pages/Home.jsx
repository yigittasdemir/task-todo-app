import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { addTodo, auth, deleteTodo } from "../firebase";

const Home = () => {
  const date = new Date().toLocaleDateString("tr-TR");

  const { user } = useSelector((state) => state.auth);
  const { todos } = useSelector((state) => state.todos);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitHandle = async (e) => {
    e.preventDefault();
    await addTodo({
      title,
      description,
      uid: user.uid,
    });
    setTitle("");
    setDescription("");
  };

  const handleDelete = async (id) => {
    const result = await deleteTodo(id);
    console.log(result);
  };

  if (user) {
    return (
      <div className="max-w-full max-sm:px-4 md:px-4 lg:max-w-3xl lg:px-2 px-52 mx-auto">
        <Sidebar />
        <Toaster position="top-right" />
        <div className="bg-slate-300 relative z-30 max-w-4xl rounded-md mx-auto py-4 mt-14 max-sm:mt-8">
          <div className="px-4 flex justify-between">
            <h1 className="font-sans font-semibold">
              Hoşgeldin {user.displayName}
            </h1>
            <h1>{date}</h1>
          </div>
        </div>
        <div className="bg-slate-300 relative z-30 rounded-md mx-auto py-4 mt-14 max-sm:mt-8">
          <div className="px-4 flex justify-between">
            <h1 className="font-sans font-semibold">Todo & Task</h1>
          </div>

          <form
            onSubmit={submitHandle}
            className="px-4 mt-4 mx-left w-2 grid gap-y-4 py-2"
          >
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white rounded-md pl-4 text-left py-2.5 border-hidden  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              placeholder="Başlık"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white rounded-md pl-4 pr-14 text-left py-2.5 border-hidden  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              placeholder="Açıklama"
            />
            <div>
              <button
                disabled={!title}
                className="bg-indigo-700 disabled:opacity-20 disabled:cursor-default px-4 py-2 rounded-md ml-0 text-white text-xl"
              >
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </form>

          <div class="p-4 grid grid-cols-2 gap-4 max-sm:grid-cols-1 flex-wrap">
            {todos.map((todo) => {
              return (
                <div class="max-w-sm overflow-hidden max-sm:w-full rounded shadow-lg bg-slate-400">
                  <div className="flex px-3 pt-2 justify-between items-center space-x-2">
                    <div className="flex items-center">
                      {user.photoURL ? (
                        <img
                          className="w-12 h-12 rounded-full m-auto object-cover bg-center"
                          src={user.photoURL}
                          alt="user-img"
                        />
                      ) : (
                        <div className="block text-center justify-center relative py-2">
                          <img
                            className="w-11 h-11 bg-slate-400 rounded-full m-auto object-cover bg-center"
                            src="/avatar.webp"
                            alt="avatar"
                          />
                        </div>
                      )}
                      <h3 className="px-3">{user.displayName}</h3>
                    </div>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="text-right bg-indigo-700 text-white py-2 px-4 rounded-full"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>

                  <div className="flex">
                    <div key={todo.id} class="px-6 py-4">
                      <h1 className="text-black font-semibold pb-2">
                        {todo.title}
                      </h1>
                      <p class="text-gray-700 text-base">{todo.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div
        className="absolute bg-cover bg-center 
     w-screen h-screen object-cover top-0 left-0 z-40  bg-no-repeat bg-[url('/public/task-website-background.webp')]"
      >
        <h1 className="font-bold text-white w-screen text-center text-3xl absolute mt-24">
          HOŞGELDİNİZ
        </h1>
        <div className="flex flex-wrap justify-center mx-auto space-x-2 mt-56">
          <div className="bg-white p-3 w-2/6 max-sm:w-2/5 block rounded-md">
            <h2 className="font-semibold text-lg">Task Oluşturun</h2>
            <p>Task oluşturup planlı ve verimli bir çalışma gerçekleştirin</p>
          </div>
          <div className="bg-white p-3 w-2/6 max-sm:w-2/5 block rounded-md">
            <h2 className="font-semibold text-lg">Ekibinizle Paylaşın</h2>
            <p>Hesabınızı ekibinizle paylaşarak görev dağılımı yapın</p>
          </div>
        </div>
        <div className="mt-7">
          <ul className="flex space-x-7 justify-center">
            <Link
              className="font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-2 rounded-md"
              to="/login"
            >
              Giriş Yap
            </Link>

            <Link
              className="font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-2 rounded-md"
              to="/register"
            >
              Hesap Oluştur
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
