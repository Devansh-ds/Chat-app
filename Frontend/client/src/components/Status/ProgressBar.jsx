import React, { useEffect, useState } from "react";
import "./ProgressBar.css";

const ProgressBar = ({ index, activeIndex, duration, reset }) => {
  const isActive = index === activeIndex;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame;
    let startTime;

    if (isActive) {
      setProgress(0);
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progressPercent = Math.min((elapsed / duration) * 100, 100);
        setProgress(progressPercent);
        if (progressPercent < 100) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      animationFrame = requestAnimationFrame(animate);
    } else {
      // Reset when not active
      setProgress(0);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isActive, duration]);

  return (
    <div className={`progress-bar-container ${isActive ? "active" : ""}`}>
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
