import React from "react";
import StatusUserCard from "./StatusUserCard";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Status = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="flex items-center px-[14vw] py-[7vh] bg-gray-500">
        {/* left side part */}
        <div className="left h-[86vh] bg-[#1e262c] lg:w-[30%] w-[50%] px-2">
          <div className="pt-5 h-[15%]">
            <StatusUserCard />
          </div>
          <hr />
          <div className="overflow-y-scroll h-[80%] pt-2">
            {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => {
              return <StatusUserCard />;
            })}
          </div>
        </div>
        {/* right side part */}
        <div className="right relative h-[86vh] lg:w-[70%] w-[50%] bg-[#0b141a] flex justify-center items-center p-10">
          <AiOutlineClose
            onClick={handleNavigate}
            className="text-white absolute top-5 right-5 text-xl cursor-pointer"
          />
          <p className="text-white text-xl text-center">
            Click on Contact to view their status update
          </p>
        </div>
      </div>
    </div>
  );
};

export default Status;
