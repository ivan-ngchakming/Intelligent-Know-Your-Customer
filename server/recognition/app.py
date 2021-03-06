import cv2
import pickle
import os

from server.queries import models, users


BASE_DIR = os.path.dirname(os.path.abspath(__file__))


class Recognition:
	def __init__(self, user_name):
		self.user_name = user_name
		# Load recognize and read label from model
		self.recognizer = cv2.face.LBPHFaceRecognizer_create()

		user_id = users.get(name=user_name)['user_id']
		self.model_path = models.get(user_id=user_id)['path']
		self.recognizer.read(f"{self.model_path}/train.yml")

		self.face_cascade = cv2.CascadeClassifier(f'{BASE_DIR}/haarcascade/haarcascade_frontalface_default.xml')

		with open(f"{self.model_path}/labels.pickle", "rb") as f:
			self.labels = {v: k for k, v in pickle.load(f).items()}
	
	def detect_recognize(self, img):
		gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
		faces = self.face_cascade.detectMultiScale(gray, scaleFactor=1.5, minNeighbors=3)

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
