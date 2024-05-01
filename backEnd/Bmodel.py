
import matplotlib.pyplot as plt
# Load your trained model
import numpy as np
import os
import dlib
import cv2
import numpy as np
from PIL import Image, ImageChops, ImageEnhance
# help(image_preprocessing)
import shutil
os.environ['TF_FORCE_GPU_ALLOW_GROWTH'] = 'true'
script_dir = os.path.dirname(os.path.abspath(__file__))
# from keras.preprocessing.image import img_to_array
print(os.getcwd())  # Print the current working directory
from tensorflow.keras.preprocessing.image import img_to_array # type: ignore
from videoplay import videoPlay
# import tensorflow as tf
# print(tf.__version__)

 

 
def prediction(model, video_path, folder_name):
    result_path = './result/' + folder_name
    if os.path.exists(result_path):
        shutil.rmtree(result_path)
    os.makedirs(result_path)

    detector = dlib.get_frontal_face_detector()
    cap = cv2.VideoCapture(video_path)
    frameRate = cap.get(5)
    count = 0
    predict=0
    while cap.isOpened():
        frameId = cap.get(1)
        ret, frame = cap.read()
        if not ret:
            break

        count += 1
        if frameId % ((int(frameRate) + 1) * 1) == 0:
            face_rects, scores, idx = detector.run(frame, 0)

            for i, d in enumerate(face_rects):
                x1 = d.left()
                y1 = d.top()
                x2 = d.right()
                y2 = d.bottom()
                crop_img = frame[y1:y2, x1:x2]
                data = img_to_array(cv2.resize(crop_img, (128, 128))).flatten() / 255.0
                data = data.reshape(-1, 128, 128, 3)

                prediction = np.argmax(model.predict(data))
                if prediction == 1:
                    label = 'FAKE'
                elif prediction == 0:
                    label = 'REAL'
                    predict=1
                else:
                    continue
                
                # Draw the label on the cropped image
                cv2.putText(crop_img, label, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

                # Save the cropped image with the label
                cv2.imwrite(os.path.join(result_path, f'frame{count}_{i}.jpg'), crop_img)
                print(f"Writing frame: {count}")
    videoPlay(video_path,predict)            
    if predict == 1:
      print("image is real")
      result = "Real"
    else: 
      print("Image not real")
      result = "Fake"
    return result
    

    cap.release()
    cv2.destroyAllWindows()

# mod = select_model(model)
# prediction(mod, '/content/gdrive/MyDrive/show/' + video_name, video)

# # model = select_model('VGG16')
# # print(prediction(model,'./test_videos/dgmevclvzy.mp4'))







# def prediction(model,video_path):
   
#     input_shape = (128, 128, 3)
#     pr_data = []
#     detector = dlib.get_frontal_face_detector()
#     cap = cv2.VideoCapture(video_path)
#     frameRate = cap.get(5)
#     while cap.isOpened():
#         frameId = cap.get(1)
#         ret, frame = cap.read()
#         if ret != True:
#             break
#         if frameId % ((int(frameRate)+1)*1) == 0:
#             face_rects, scores, idx = detector.run(frame, 0)
#             for i, d in enumerate(face_rects):
#                 x1 = d.left()
#                 y1 = d.top()
#                 x2 = d.right()
#                 y2 = d.bottom()
#                 crop_img = frame[y1:y2, x1:x2]
#                 data =  tf.keras.preprocessing.image.img_to_array(cv2.resize(crop_img, (128, 128))).flatten() / 255.0
#                 data = data.reshape(-1, 128, 128, 3)
#                 return np.argmax(model.predict(data))