import React from "react";
import Sidebar from "../Components/Sidebar";
import UpdateProfile from "../Components/UpdateProfile";

const Settings = () => {
  return (
    <div className="max-w-full max-sm:px-4 md:px-4  px-52 mx-auto">
      <Sidebar />
      <UpdateProfile />
    </div>
  );
};

export default Settings;
