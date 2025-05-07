import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const SelectedMember = ({ handleRemoveMember, member }) => {
  const defaultProfilePic =
    "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png";

  return (
    <div className="flex space-x-2 justify-between  items-center h-6 bg-slate-300 rounded-full min-w-[110px] pr-2 mb-2">
      <img
        src={member.profilePicture || defaultProfilePic}
        alt=""
        className="w-6 h-6 rounded-full"
      />
      <p>{member?.fullname?.substring(0, 4) + "..." || "no name"}</p>
      <AiOutlineClose
        onClick={handleRemoveMember}
        className="cursor-pointer text-black w-4 h-4"
      />
    </div>
  );
};

export default SelectedMember;
