import { useState } from "react";
import Button from "./Button";
import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px; /* Rounded corners */
    background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
`;

const ModalContent = styled.div`
  margin: 15% auto;
  padding: 20px;
  width: 50%;
  border-radius: 10px;
    border: 2px dashed #007bff; /* Blue dashed border */
    background-color: #f1f1f1;
    color: #333;
    cursor: pointer;
    box-shadow: 0 8px 16px rgba(0, 0, 255, 0.1); /* Blue shadow effect */
}
`;

const VideoPreview = styled.video`
  width: 60%;
`;

export default function UploadVideo() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [showInput, setShowInput] = useState(false);
    const [videoURL, setVideoURL] = useState('');

    function handleFileChange(event) {
        setSelectedFile(event.target.files[0]);
        setVideoURL(URL.createObjectURL(event.target.files[0])); // Set video URL for preview
    }

    function handleSubmit() {
        if (!selectedFile) {
            console.error('No file selected.');
            return;
        }

        const formData = new FormData();
        formData.append('video', selectedFile, 'videoFile.mp4');

        fetch("http://localhost:8000/uploadVideo", {
            method: 'POST',
            body: formData
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('File uploaded successfully:');
            alert("the selected video will be processed for checking")
            setShowInput(false)
            setVideoURL('')
        })
        .catch(error => {
            console.error('Error uploading file:', error);
        });
    }

    return (
        <div>
            {showInput ? (
                <Modal>
                    <ModalContent>
                        <span style={{ float: "right" }}>
                            <Button bgcolor="transparent" textcolor="red" onClick={() => {
                                setShowInput(false);
                                setSelectedFile(null);
                                setVideoURL('');
                            }}>X</Button>
                        </span>
                        <label htmlFor="videoFile">Select Video File:</label>
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
                        {videoURL && <div style={{justifyContent:"center",textAlign:"center", marginBottom:"25px"}}><VideoPreview controls src={videoURL} />
                        <br></br>
                        <br></br>
                        <Button bgcolor="red" textcolor="white" onClick={handleSubmit}>Upload</Button></div>}
                        
                    </ModalContent>
                </Modal>
            ) : (
                <Button bgcolor="#87A093" textcolor="white"  onClick={() => setShowInput(true)}>Upload Video</Button>
            )}
        </div>
    );
}
