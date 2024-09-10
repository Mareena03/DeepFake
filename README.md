# DeepReality - Deepfake Detection System
<img src="https://github.com/Mareena03/DeepFake/blob/main/landing.jpeg">
<img src="https://github.com/Mareena03/DeepFake/blob/main/result%20upload.png">
## Introduction
DeepReality is a web-based system for detecting deepfake videos. It uses deep learning techniques, specifically Convolutional Neural Networks (CNNs), to identify manipulated content. The project features a React-based frontend and a FastAPI backend.

## Features
- Detects deepfake videos by analyzing frames.
- Uses CNNs for accurate classification.
- React frontend for video uploads and result display.
- FastAPI backend for video processing and inference.

## Installation

### Backend (FastAPI)
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/DeepReality.git
    ```
2. Navigate to the backend folder:
    ```bash
    cd backend
    ```
3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4. Run the FastAPI server:
    ```bash
    uvicorn main:app --reload
    ```

### Frontend (React)
1. Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the React app:
    ```bash
    npm start
    ```

## Usage
1. Run both backend and frontend.
2. Upload a video through the React interface.
3. The result (real or fake) will be displayed after analysis.

## License
This project is licensed under the MIT License.

---


