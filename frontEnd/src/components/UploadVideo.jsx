import { useState } from "react";
import Button from "./Button";

export default function UploadVideo() {
    const [selectedFile, setSelectedFile] = useState(null);

    function handleFileChange(event) {
        setSelectedFile(event.target.files[0]);
    }

    function handleSubmit() {
        if (!selectedFile) {
            console.error('No file selected.');
            return;
        }

        const formData = new FormData();
        formData.append('video', selectedFile);

        fetch("http://localhost:8000/uploadVideo", {
            method: 'POST',
            body: formData
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('File uploaded successfully:');
        })
        .catch(error => {
            console.error('Error uploading file:', error);
        });
    }
    
    return (
        <div>
            <label htmlFor="videoFile">Select Video File:</label>
            <input 
                type="file" 
                id="videoFile" 
                name="videoFile" 
                accept="video/*" 
                // accept="/*"    can upload any  type if this is added
                onChange={handleFileChange} 
                required 
            />
            <br />
            <Button bgcolor="red" textcolor="white" onClick={handleSubmit}>Upload</Button>
        </div>
    );
}
