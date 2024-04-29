/* eslint-disable react/prop-types */
import { useEffect } from "react";
import styled from "styled-components";
import srrc from "/MainProject/DeepFake/backEnd/Video/output_video.mp4";

// Styled components for better organization
const VideoContainer = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
`;

const VideoPlayer = styled.video`
  max-height: 100%;
  max-width: 100%;
  border-radius: 20px;
`;

const ContentWrapper = styled.div``;

const Heading = styled.h2`
  text-decoration: underline;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
`;

export default function VideoComp({
  videoData,
  predictionResult,
  setPredictionResult,
}) {
  useEffect(() => {
    if (videoData) {
      setPredictionResult(videoData);
    } else {
      fetch("http://localhost:8000/data")
        .then((res) => res.json())
        .then((data) => {
          setPredictionResult(data.details || "No prediction result available");
        })
        .catch((error) =>
          console.error("Error fetching prediction result:", error)
        );
    }
  }, [videoData, setPredictionResult]);

  return (
    <VideoContainer>
      <ContentWrapper>
        <Heading>
          The Result : <span style={{ color: "red" }}>{predictionResult}</span>
        </Heading>
      </ContentWrapper>
      <VideoPlayer src={srrc} controls autoPlay loop></VideoPlayer>
    </VideoContainer>
  );
}
