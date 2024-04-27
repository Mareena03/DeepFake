/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styled from "styled-components";

// Styled components for better organization
const VideoContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const VideoPlayer = styled.video`
  width: 100%;
  max-width: 800px;
  border-radius: 20px;
`;

const ContentWrapper = styled.div`
  padding: 20px;
`;

const Heading = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
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
      <VideoPlayer controls autoPlay loop></VideoPlayer>
    </VideoContainer>
  );
}
