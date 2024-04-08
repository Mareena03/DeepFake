from fastapi import FastAPI,File,UploadFile
from pydantic import BaseModel
from random import randrange
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from Bmodel import prediction
import keras as tf
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


class SignupDetail(BaseModel):
    title: str
    content: str

signup_data=[]

@app.post("/signup")
async def signup(signupdetails:SignupDetail):
    signup_data_dict=signupdetails.dict()
    signup_data_dict["id"]=generate_post_id()
    signup_data.append(signup_data_dict)
    return{"message":"signup sucessfull","data":signup_data}


@app.post("/login")
async def login(login_details: LoginDetail):
    login_data_dict = login_details.dict()
    login_data_dict["id"] = generate_post_id()
    login_data.append(login_data_dict)
    return {"message": "Login sucessfull"}

# @app.get("/data")
# async def get_data():
#     return {"details": login_data}

# ..........................................................................
# video_data=[]
UPLOAD_DIRECTORY = "uploads"
global prediction_result_main

# @app.post("/uploadVideo")
# async def upload_video(video: UploadFile = File(...)):
    
#     try:
#         if not os.path.exists(UPLOAD_DIRECTORY):
#             os.makedirs(UPLOAD_DIRECTORY)

#         file_location = os.path.join(UPLOAD_DIRECTORY, video.filename)
#         with open(file_location, "wb") as file_object:
#             file_object.write(video.file.read())
#             prediction_result_main = preprocess_and_predict(file_location)
#         print("Prediction result:", prediction_result_main)
#         return {"message": "File uploaded successfully", "file_location": file_location}
#     except Exception as e:
#         return {"error": str(e)}

prediction_result_main = None

@app.post("/uploadVideo")
async def upload_video(video: UploadFile = File(...)):
    global prediction_result_main

    try:
        if not os.path.exists(UPLOAD_DIRECTORY):
            os.makedirs(UPLOAD_DIRECTORY)

        file_location = os.path.join(UPLOAD_DIRECTORY, video.filename)
        with open(file_location, "wb") as file_object:
            file_object.write(video.file.read())
            prediction_result_main = preprocess_and_predict(file_location)
        print("Prediction result:", prediction_result_main)
        return {"message": "File uploaded successfully", "file_location": file_location, "prediction_result": prediction_result_main}
    except Exception as e:
        return {"error": str(e)}

@app.get("/data")
async def get_video_data():
    global prediction_result_main
    if prediction_result_main is not None:
        return {"details": prediction_result_main}
    else:
        return {"error": "No prediction result available"}


def preprocess_and_predict(file_location):
    model = tf.models.load_model('models\deepfake-detection-model-vgg.h5')
    # Perform preprocessing (if any) on the uploaded video file
    # Run prediction using the deepfake detection function
    video_name = file_location
    video = video_name.split('.')[0]
    extension = video_name.split('.')[1]
    video_name = video + '.' + extension
    prediction_result = prediction(model,file_location,video_name)
    return prediction_result

# @app.get("/data")
# async def get_video_data():
#     return {"details":prediction_result_main}

