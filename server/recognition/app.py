import cv2
import pickle
import os


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

class Recognition:
	def __init__(self):
		# Load recognize and read label from model
		self.recognizer = cv2.face.LBPHFaceRecognizer_create()
		self.recognizer.read(f"{BASE_DIR}/models/train.yml")

		self.face_cascade = cv2.CascadeClassifier(f'{BASE_DIR}/haarcascade/haarcascade_frontalface_default.xml')

		with open(f"{BASE_DIR}/models/labels.pickle", "rb") as f:
			self.labels = {v: k for k, v in pickle.load(f).items()}
	
	def detect_recognize(self, img):
		gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
		faces = self.face_cascade.detectMultiScale(gray, scaleFactor=1.5, minNeighbors=3)
		dimensions = gray.shape

		result = []
		for (x, y, w, h) in faces:
			print(x, w, y, h)
			roi_gray = gray[y:y + h, x:x + w]
			# predict the id and confidence for faces
			id_, conf = self.recognizer.predict(roi_gray)
			result.append({
				'id': id_, 
				'confidence': conf,
				'location': list(map(float, [x, y, w, h])),
			})
		
		return result
