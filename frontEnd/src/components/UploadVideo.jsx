import { useState } from "react";
import Button from "./Button";
import LoadingScreen from "./LoadingScreen";
import styled from "styled-components";
import VideoComp from "./VideoComp";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const Modal = styled.div`
  background-color: #f1f1f1;
  color: #333;
  border-radius: 10px;
  border: 2px dashed #007bff;
  box-shadow: 0 8px 16px rgba(0, 0, 255, 0.1);
  padding: 20px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VideoPreview = styled.video`
  width: 60%;
  max-width: 100%;
`;

export default function UploadVideo() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [videoData, setVideoData] = useState(null);

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
    setVideoURL(URL.createObjectURL(event.target.files[0]));
  }

  function handleSubmit() {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("video", selectedFile, "videoFile.mp4");
    fetch("http://localhost:8000/uploadVideo", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("File uploaded successfully:", data);
        setVideoURL("");
        setIsLoading(false);
        setHasResult(true);
        setVideoData(data.prediction_result);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        setIsLoading(false);
      });
  }
  return hasResult ? (
    <VideoComp videoData={videoData} />
  ) : (
    <div>
      <ModalOverlay>
        <Modal>
          <ModalContent>
            <label style={{ fontSize: "30px" }} htmlFor="videoFile">
              Select Video File:
            </label>
            <br />
            <br />
            <br />
            <br />
            <input
              type="file"
              id="videoFile"
              name="videoFile"
              accept="video/*"
              onChange={handleFileChange}
              required
            />
            <br />
            <br />
            {videoURL && (
              <div
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                  marginBottom: "25px",
                }}
              >
                <VideoPreview controls src={videoURL} />
                <br />
                <br />
                <Button bgcolor="red" textcolor="white" onClick={handleSubmit}>
                  Upload
                </Button>
              </div>
            )}
          </ModalContent>
        </Modal>
      </ModalOverlay>
      {isLoading && <LoadingScreen />}
    </div>
  );
}
