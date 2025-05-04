import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const SelectedMember = ({ handleRemoveMember, member }) => {
  return (
    <div className="flex items-center bg-slate-300 rounded-full">
      <img
        src="https://images.pexels.com/photos/15676265/pexels-photo-15676265/free-photo-of-close-up-of-palm-tree-green-leaves.jpeg"
        alt=""
        className="w-7 h-7 rounded-full"
      />
      <p className="px-2">Username</p>
      <AiOutlineClose
        onClick={handleRemoveMember}
        className="mr-2 cursor-pointer"
      />
    </div>
  );
};

export default SelectedMember;
