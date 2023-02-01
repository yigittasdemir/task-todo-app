import "./index.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Modal from "./Components/Modal";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Settings from "./pages/Settings";

function App() {
  const { user } = useSelector((state) => state.auth);

  const { open, data } = useSelector((state) => state.modal);

  if (user) {
    return (
      <div>
        <Toaster position="top-right" />
        {open && <Modal />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      {open && <Modal />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
