/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

function TypingText({ text, speed }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, speed);
    return () => clearInterval(intervalId);
  }, [text, speed]);

  return (
    <span>
      <h1 style={{ fontSize: "2em" }}>{displayedText}</h1>
    </span>
  );
}

export default TypingText;
