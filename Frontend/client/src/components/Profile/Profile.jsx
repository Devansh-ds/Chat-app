import { useScrollTrigger } from "@mui/material";
import React, { useState } from "react";
import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../Redux/Auth/Action";
import { useDispatch, useSelector } from "react-redux";

const Profile = ({ handleCloseOpenProfile, setProfileName, setProfilePic }) => {
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  const [tempPicture, setTempPicture] = useState(auth?.reqUser?.profilePicture);
  const [username, setUsername] = useState(auth?.reqUser?.fullname || "Person");
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const defaultProfilePic =
    "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png";

  const [flag, setFlag] = useState(false);
  const handleFlag = () => {
    setFlag(true);
  };
  const handleCheckClick = (e) => {
    dispatch(
      updateUser({
        token: token,
        body: {
          fullname: username,
        },
      })
    );
    setProfileName(username);
    setFlag(false);
  };

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const uploadToCloudinary = (pics) => {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "yhnzqcew");
    data.append("cloud_name", "ddgyzedwh");
    console.log(data);
    fetch("https://api.cloudinary.com/v1_1/ddgyzedwh/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(
          updateUser({
            token: token,
            body: {
              profilePicture: data.url.toString(),
            },
          })
        );
        setTempPicture(data.url?.toString());
        setProfilePic(data.url?.toString());
        
      });
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
            src={
              tempPicture || auth.reqUser?.profilePicture || defaultProfilePic
            }
            className="rounded-full w-[15vw] h-[15vw] cursor-pointer"
          />
        </label>
        <input
          onChange={(e) => uploadToCloudinary(e.target.files[0])}
          type="file"
          id="imgInput"
          className="hidden"
        />
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
