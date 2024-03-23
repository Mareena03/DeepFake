from fastapi import FastAPI
from fastapi import File,UploadFile
from pydantic import BaseModel
from random import randrange
from fastapi.middleware.cors import CORSMiddleware

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
    return {"message": "Video uploaded successfully"}

@app.get("/data")
async def get_data():
    return {"details": login_data}

# ..........................................................................
video_data=[]

@app.post("/uploadVideo")
async def upload_video(video_file: UploadFile = File(...)):
    video_data_dict = {
        "filename": video_file.filename,
        "content_type": video_file.content_type,
        "id": generate_post_id()
    }
    video_data.append(video_data_dict)
    return {"message": "Video uploaded successfully"}

@app.get("/video_data")
async def get_video_data():
    return {"details": video_data}