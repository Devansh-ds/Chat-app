import React, { useEffect, useState } from "react";
import { stories } from "./DummyStory";
import ProgressBar from "./ProgressBar";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const StatusViewer = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentStoryIndex((prev) => {
        const next = (prev + 1) % stories.length;
        setActiveIndex(next);
        return next;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="flex relative items-center justify-center h-[100vh] bg-slate-900">
        <div className="relative w-full">
          <img
            src={stories?.[currentStoryIndex].image}
            className="max-h-[96vh] h-[96vh] max-w-[80vw] object-contain mb-[4vh] mx-auto "
          />
          <div className="absolute top-0 flex w-[50vw] mx-[25vw]">
            {stories?.map((item, index) => {
              return (
                <ProgressBar
                  key={index}
                  duration={2000}
                  index={index}
                  activeIndex={activeIndex}
                  reset={index === 0}
                />
              );
            })}
          </div>
        </div>
        <div>
          <BsArrowLeft
            onClick={handleNavigate}
            className="absolute top-5 left-10 text-2xl cursor-pointer text-white"
          />
          <AiOutlineClose
            onClick={handleNavigate}
            className="absolute top-5 right-10 text-2xl cursor-pointer text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default StatusViewer;
