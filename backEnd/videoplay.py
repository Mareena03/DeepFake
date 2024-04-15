# import dlib
# import cv2
# import os

# def videoPlay(video_path, predict):
#     # Load the face detector
#     detector = dlib.get_frontal_face_detector()

#     # Open video capture
#     cap = cv2.VideoCapture(video_path)

#     # Get video properties
#     fps = int(cap.get(cv2.CAP_PROP_FPS))
#     frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
#     frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

#     # Define the codec and create VideoWriter object
#     fourcc = cv2.VideoWriter_fourcc(*'mp4v')  # MP4V codec for MP4 format
#     output_video_path = os.path.join('Video', 'output_video.mp4')
#     out = cv2.VideoWriter(output_video_path, fourcc, fps, (frame_width, frame_height))

#     while True:
#         # Read frame
#         ret, frame = cap.read()
#         if not ret:
#             break

#         # Convert frame to grayscale for face detection
#         gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

#         # Detect faces in the grayscale frame
#         faces = detector(gray)

#         # Draw rectangle around each face and add custom name
#         for face in faces:
#             x1 = face.left()
#             y1 = face.top()
#             x2 = face.right()
#             y2 = face.bottom()
#             cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 3)

#             # Add custom name
#             if predict == 1:
#                 Custom_Name = "Real"
#             else:
#                 Custom_Name = "fake"

#             cv2.putText(frame, Custom_Name, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

#         # Write the frame to the output video file
#         out.write(frame)

#     # Release video capture and writer
#     cap.release()
#     out.release()
#     cv2.destroyAllWindows()

# # Example usage:
# # videoPlay('input_video.avi', 1)  # Replace 'input_video.avi' with your input video path




import dlib
import cv2
import os

def videoPlay(video_path, predict):
    # Load the face detector
    detector = dlib.get_frontal_face_detector()

    # Open video capture
    cap = cv2.VideoCapture(video_path)

    # Get video properties
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    # Define the codec and create VideoWriter object
    fourcc = cv2.VideoWriter_fourcc(*'avc1')  # H.264 codec for MP4 format
    output_video_path = os.path.join('Video', 'output_video.mp4')
    out = cv2.VideoWriter(output_video_path, fourcc, fps, (frame_width, frame_height))

    while True:
        # Read frame
        ret, frame = cap.read()
        if not ret:
            break

        # Convert frame to grayscale for face detection
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Detect faces in the grayscale frame
        faces = detector(gray)

        # Draw rectangle around each face and add custom name
        for face in faces:
            x1 = face.left()
            y1 = face.top()
            x2 = face.right()
            y2 = face.bottom()
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 3)

            # Add custom name
            if predict == 1:
                Custom_Name = "Real"
            else:
                Custom_Name = "fake"

            cv2.putText(frame, Custom_Name, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

        # Write the frame to the output video file
        out.write(frame)

        # Display the resulting frame
        # cv2.imshow('Video', frame)

        # # Exit if 'q' is pressed
        # if cv2.waitKey(1) & 0xFF == ord('q'):
        #  break

    # Release video capture and writer
    cap.release()
    out.release()
    cv2.destroyAllWindows()

# Example usage:
# videoPlay('input_video.avi', 1)  # Replace 'input_video.avi' with your input video path
