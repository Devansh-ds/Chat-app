import { Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { BsArrowLeft, BsCheck2 } from "react-icons/bs";

const NewGroup = ({setNewGroup}) => {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [groupName, setGroupName] = useState("");

  return (
    <div className="w-full h-full">
      <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
        <BsArrowLeft className="cursor-pointer text-2xl font-bold" onClick={() => {
            setNewGroup(false)
        }} />
        <p className="text-xl font-semibold">New Group</p>
      </div>

      <div className="flex flex-col justify-center items-center mt-12 mx-5 xl:mx-20 xl:mt-8">
        <label htmlFor="imgInput" className="relative">
          <img
            src="https://codeopinion.com/wp-content/uploads/2017/02/group-of-members-users-icon.png"
            alt=""
            className="border border-black rounded-full p-4"
          />
          {isImageUploading && (
            <CircularProgress className="absolute top-[5rem] left-[43%]" />
          )}
        </label>
        <input
          type="file"
          id="imgInput"
          className="hidden"
          onChange={() => console.log("Image on change")}
          value={""}
        />
      </div>

      <div className="w-full justify-between flex items-center py-10 px-5">
        <input
          type="text"
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
          className="w-full outline-none border-b-2 border-green-700 px-2 bg-transparent pb-2"
          placeholder="Group Subject or Name"
        />
      </div>

      {groupName && (
        <div className="py-2items-center flex justify-center">
          <Button>
            <div className="bg-[#0c977d] rounded-full p-4">
              <BsCheck2 className="text-white font-bold text-3xl" />
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewGroup;
