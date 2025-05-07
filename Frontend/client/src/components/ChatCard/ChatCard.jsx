import React from "react";

const ChatCard = ({ item }) => {
  return (
    <div className="flex items-center justify-center py-2 group cursor-pointer mb-2 border-b-2 border-b-slate-200">
      <div className="w-[20%] ">
        <img
          src={
            item?.profilePicture ||
            "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
          }
          className="w-14 h-12 rounded-full border xl:h-12 xl:w-12"
        />
      </div>
      <div className="pl-5 xl:pl-0 w-[80%]">
        <div className="flex justify-between items-center">
          <p className="text-lg">{item?.fullname || "no name"}</p>
          <p className="text-sm">9:45</p>
        </div>
        <div className="flex justify-between items-center">
          <p>message...</p>
          <div className="flex space-x-2 items-center">
            <p className="text-xs py-1 px-2 text-white bg-green-500 rounded-full">
              5
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
