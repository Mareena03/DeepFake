from fastapi import FastAPI
from pydantic import BaseModel
from random import randrange
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["POST","GET"],
    allow_headers=["*"],
)

class loginDeat(BaseModel):
    title: str
    content: str

login = [
    {"title": "title1", "content": "content1", "id": 1},
    {"title": "title2", "content": "content2", "id": 2}
]

def generate_post_id():
    return randrange(0, 1000000)

@app.post("/uploadVideo")
async def home(login_details: loginDeat):
    print(login_details)
    loginData = login_details.dict()
    print(loginData)
    loginData["id"] = generate_post_id()
    login.append(loginData)
    return {
        'message': "welcome"
    }

@app.get("/data")
async def deat():
    return {
        "deatils": login
    }

# # Handling OPTIONS requests
# @app.options("/uploadVideo")
# async def options_upload_video():
#     return {"allow": "POST"}  # Allow POST method for /uploadVideo endpoint

