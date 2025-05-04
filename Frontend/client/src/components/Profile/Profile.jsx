import { useScrollTrigger } from "@mui/material";
import React, { useState } from "react";
import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Profile = ({ handleCloseOpenProfile }) => {
  const navigate = useNavigate();

  const [flag, setFlag] = useState(false);
  const handleFlag = () => {
    setFlag(true);
  };
  const handleCheckClick = () => {
    setFlag(false);
  };

  const [username, setUsername] = useState("");
  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="w-full h-full">
      {/* way to go back to chat */}
      <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
        <BsArrowLeft
          className="cursor-pointer text-2xl font-bold"
          onClick={handleCloseOpenProfile}
        />
        <p className="cursor-pointer font-semibold">Profile</p>
      </div>

      {/* editable profile pic */}
      <div className="flex flex-col justify-center items-center my-12 xl:my-8">
        <label htmlFor="imgInput">
          <img
            src="https://cdn.pixabay.com/photo/2023/08/07/13/44/tree-8175062_1280.jpg"
            className="rounded-full w-[15vw] h-[15vw] cursor-pointer"
          />
        </label>
        <input type="file" id="imgInput" className="hidden" />
      </div>

      {/* editable name */}
      <div className="px-8 bg-white">
        <p className="py-3">Your name</p>
        {!flag && (
          <div className="flex justify-between items-center w-full">
            <p className="py-3">{username || "username"}</p>
            <BsPencil onClick={handleFlag} className="cursor-pointer" />
          </div>
        )}

        {flag && (
          <div className="flex items-center justify-between">
            <input
              onChange={handleNameChange}
              className="w-[80%] outline-none border-b-2 border-blue-700 pt-3 mb-3"
              type="text"
              placeholder="Enter your name"
              value={username}
            />
            <BsCheck2
              onClick={handleCheckClick}
              className="cursor-pointer text-2xl"
            />
          </div>
        )}
      </div>

      <div className="px-8 my-5">
        <p className="py-10 xl:py-4">
          This is your username. This will be visible to your whatsapp contacts.
        </p>
      </div>
    </div>
  );
};

export default Profile;
