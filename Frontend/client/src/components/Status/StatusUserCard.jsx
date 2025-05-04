import React from "react";
import { useNavigate } from "react-router-dom";

const StatusUserCard = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/status/1");
  };

  return (
    <div
      onClick={handleNavigate}
      className="flex items-center p-3 pl-8 cursor-pointer"
    >
      <div>
        <img
          src="https://cdn.pixabay.com/photo/2023/08/07/13/44/tree-8175062_1280.jpg"
          className="h-8 w-8 lg:w-10 lg:h-10 rounded-full"
        />
      </div>
      <div className="ml-4 text-white">
        <p>Samay</p>
      </div>
    </div>
  );
};

export default StatusUserCard;
