/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styled from "styled-components";
// import srrc from "/Users/nikhi/OneDrive/Documents/DeepFake/backEnd/Video/output_video.mp4";
import srrc from "/MainProject/DeepFake/backEnd/Video/output_video.mp4";

// Styled components for better organization
const VideoContainer = styled.div`
  background-color: #000;
  padding: 20px;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
`;

const VideoPlayer = styled.video`
  height: 100%;
  width: 100%;
  border-radius: 20px;
`;

const ContentWrapper = styled.div`
  padding: 10px;
`;

const Heading = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
`;

// Main component
export default function VideoComp({ videoData }) {
  const [predictionResult, setPredictionResult] = useState(null);

  useEffect(() => {
    // Check if videoData is provided
    if (videoData) {
      setPredictionResult(videoData);
    } else {
      // If videoData is not provided, fetch it from the backend
      fetch("http://localhost:8000/data")
        .then((res) => res.json())
        .then((data) => {
          setPredictionResult(data.details || "No prediction result available");
        })
        .catch((error) =>
          console.error("Error fetching prediction result:", error)
        );
    }
  }, [videoData]);

  return (
    <VideoContainer>
      <ContentWrapper>
        <Heading>{predictionResult}</Heading>
      </ContentWrapper>
      <VideoPlayer src={srrc} controls autoPlay loop></VideoPlayer>
    </VideoContainer>
  );
}
