import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsArrowLeft, BsCheck2 } from "react-icons/bs";
import { createGroupChat } from "../../Redux/Chat/Action";
import { useDispatch, useSelector } from "react-redux";

const NewGroup = ({ setNewGroup, groupMember, setIsGroup }) => {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupPic, setGroupPic] = useState(
    "https://codeopinion.com/wp-content/uploads/2017/02/group-of-members-users-icon.png"
  );
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const token = localStorage.getItem("token");

  const handleGroupCreation = () => {
    const data = new FormData();
    data.append("file", groupPic);
    data.append("upload_preset", "yhnzqcew");
    data.append("cloud_name", "ddgyzedwh");
    console.log(data);

    const userIds = Array.from(groupMember).map((item) => {
      return item.id;
    });
    console.log(userIds);
    userIds.push(auth.reqUser?.id);

    console.log({
      chatName: groupName,
      chatImage: "pic",
      userIds: userIds,
    });

    fetch("https://api.cloudinary.com/v1_1/ddgyzedwh/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, " img uploaded");
        dispatch(
          createGroupChat({
            token: token,
            data: {
              chatName: groupName,
              chatImage: data.url?.toString(),
              userIds: userIds,
            },
          })
        );
      });
    setIsGroup(false);
    setNewGroup(false);
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
        <BsArrowLeft
          className="cursor-pointer text-2xl font-bold"
          onClick={() => {
            setNewGroup(false);
          }}
        />
        <p className="text-xl font-semibold">New Group</p>
      </div>

      <div className="flex flex-col justify-center items-center mt-12 mx-5 xl:mx-20 xl:mt-8">
        <label htmlFor="imgInput" className="relative">
          <img
            src="https://codeopinion.com/wp-content/uploads/2017/02/group-of-members-users-icon.png"
            alt=""
            className="border border-black rounded-full p-4 cursor-pointer"
          />
          {isImageUploading && (
            <CircularProgress className="absolute top-[5rem] left-[43%]" />
          )}
        </label>
        <input
          type="file"
          id="imgInput"
          className="hidden"
          onChange={(e) => setGroupPic(e.target.files[0])}
          value={""}
        />
      </div>

      <div className="w-full justify-between flex items-center lg:pb-5 py-10 px-5">
        <input
          type="text"
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
          className="w-full outline-none border-b-2 border-green-700 px-2 bg-transparent pb-2"
          placeholder="Group Subject or Name"
          value={groupName}
        />
      </div>

      {groupName && (
        <div className="py-2 lg:py-0 items-center flex justify-center">
          <Button>
            <div className="bg-[#0c977d] rounded-full p-4">
              <BsCheck2
                onClick={handleGroupCreation}
                className="text-white font-bold text-3xl"
              />
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewGroup;
