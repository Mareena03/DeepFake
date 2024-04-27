from fastapi import FastAPI,File,UploadFile
from pydantic import BaseModel
from random import randrange
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from Bmodel import prediction
import keras as tf
import psycopg2
from psycopg2.extras import RealDictCursor 


app = FastAPI()

#setting up a connection
while True:
    try:
        conn=psycopg2.connect(host="localhost",database="DeepReality",user="postgres",password="postgress@123",cursor_factory=RealDictCursor)
        cursor=conn.cursor()
        print("keriyada makkale databaseil")
        break;
    except Exception as error:
        print("connecting to database failed")
        print("Error was :",error)




app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

def generate_post_id():
    return randrange(0, 1000000)

class Users(BaseModel):
    title: str
    content: str




@app.post("/login")
async def login(users: Users):
    cursor.execute("""SELECT * FROM users WHERE username=%s AND password=%s""", (users.title, users.content))
    newlogin = cursor.fetchall()
    return {"details": newlogin}




@app.post("/signup")
async def signup(users: Users):
    cursor.execute(""" INSERT INTO users (username,password) VALUES (%s,%s) RETURNING * """,(users.title,users.content))
    newsignup=cursor.fetchone()
    conn.commit()
    return {"message": "SignUp sucessfull","Details":newsignup}

@app.get("/data")
async def get_data():
    cursor.execute("""SELECT * FROM USERS """)
    logindata=cursor.fetchall()
    return {"details": logindata}

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