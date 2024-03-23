import { useState } from "react";
import Button from "./Button";

export default function UploadVideo() {
    const [filename, setFilename] = useState('');
    const [preview, setPreview] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    function handleFileChange(event) {
        const file = event.target.files[0];
        setFilename(file.name);
        setPreview(URL.createObjectURL(file));
        setSelectedFile(file);
    }

    function handleSubmit() {
        if (!selectedFile) {
            console.error('No file selected.');
            return;
        }

        const formData = new FormData();
        formData.append('videoFile', selectedFile);

        fetch("http://localhost:8000/uploadVideo", {
            method: 'POST',
            body: formData
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            console.log(data); // Log response from backend
            setFilename('');
            setPreview('');
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
    }
    
    return (
        <>
            <form id="uploadForm" encType="multipart/form-data">
                <label htmlFor="videoFile">Select Video File:</label>
                <input 
                    type="file" 
                    id="videoFile" 
                    name="videoFile" 
                    accept="video/*" 
                    onChange={handleFileChange} 
                    required 
                />
                <br />
                {preview && (
                    <div>
                        <p>Selected Video:</p>
                        <video width="640" height="480" controls>
                            <source src={preview} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <br />
                        <label style={{ textAlign: 'left' }}>FileName:</label><br />
                        <input
                            placeholder="Enter a file name here"
                            type="text"
                            id="name"
                            value={filename}
                            onChange={(e) => setFilename(e.target.value)}
                            style={{ width: 'calc(40% - 24px)', padding: '10px', margin: '5px 0 10px 0' }}
                        />
                        <br />
                        <Button bgcolor="red" textcolor="white" onClick={handleSubmit}>Submit</Button>
                    </div>
                )}
            </form>
        </>
    );
}
