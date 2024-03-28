from fastapi import FastAPI,File,UploadFile
from pydantic import BaseModel
from random import randrange
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

class LoginDetail(BaseModel):
    title: str
    content: str

login_data = [
    {"title": "title1", "content": "content1", "id": 1},
    {"title": "title2", "content": "content2", "id": 2}
]

def generate_post_id():
    return randrange(0, 1000000)

@app.post("/login")
async def login(login_details: LoginDetail):
    login_data_dict = login_details.dict()
    login_data_dict["id"] = generate_post_id()
    login_data.append(login_data_dict)
    return {"message": "Login sucessfull"}

@app.get("/data")
async def get_data():
    return {"details": login_data}

# ..........................................................................
video_data=[]
UPLOAD_DIRECTORY = "uploads"

@app.post("/uploadVideo")
async def upload_video(video: UploadFile = File(...)):
    try:
        if not os.path.exists(UPLOAD_DIRECTORY):
            os.makedirs(UPLOAD_DIRECTORY)

        file_location = os.path.join(UPLOAD_DIRECTORY, video.filename)
        with open(file_location, "wb") as file_object:
            file_object.write(video.file.read())

        return {"message": "File uploaded successfully", "file_location": file_location}
    except Exception as e:
        return {"error": str(e)}



@app.get("/video_data")
async def get_video_data():
    return {"details": video_data}