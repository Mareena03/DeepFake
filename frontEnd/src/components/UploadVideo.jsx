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
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  border-radius: 10px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.3);
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
            setShowInput(false)
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
                <Button bgcolor="black" textcolor="white" onClick={() => setShowInput(true)}>Upload Video</Button>
            )}
        </div>
    );
}
