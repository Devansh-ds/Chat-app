import React from "react";

const ChatCard = () => {
  return (
    <div className="flex items-center justify-center py-2 group cursor-pointer mb-2 border-b-2 border-b-slate-200">
      <div className="w-[20%]">
        <img
          src="https://cdn.pixabay.com/photo/2025/03/21/18/03/background-9485470_1280.jpg"
          className="w-14 h-12 rounded-full"
        />
      </div>
      <div className="pl-5 xl:pl-0 w-[80%]">
        <div className="flex justify-between items-center">
          <p className="text-lg">Ashish</p>
          <p className="text-sm">timestamp</p>
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
