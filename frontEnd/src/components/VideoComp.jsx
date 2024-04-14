import React, { useState, useEffect } from "react";
import styled from "styled-components";
import srrc from "/MainProject/DeepFake/backEnd/uploads/videoFile.mp4"

// Styled components for better organization
const VideoContainer = styled.div`
  text-align:center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const VideoPlayer = styled.video`
  width: 70%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const ContentWrapper = styled.div`
padding: 20px;
`;

const Heading = styled.h2`
  margin-bottom: 10px;
`;

// Main component
export default function VideoComp() {
  const [predictionResult, setPredictionResult] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/data")
      .then((res) => res.json())
      .then((data) => {
        setPredictionResult(data.details); // Assuming data.details contains the prediction result
      })
      .catch((error) =>
        console.error("Error fetching prediction result:", error)
      );
  }, [predictionResult]);

  return (
    <VideoContainer>
        <ContentWrapper>
            <Heading><h1>{predictionResult}</h1></Heading>
        </ContentWrapper>
        <VideoPlayer src={srrc} controls></VideoPlayer>
    </VideoContainer>
  );
}
