import logging
import json
import base64
import io
import cv2

from imageio import imread
from PyQt5.QtCore import pyqtSlot, QObject

from server.recognition.app import Recognition


logger = logging.getLogger(__name__)

class Auth(QObject):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.recognition = Recognition()

    @pyqtSlot(str, result=str)
    def login(self, img_base64):
        logger.debug('Logging in')
        # reconstruct image as an numpy array
        img = imread(io.BytesIO(base64.b64decode(img_base64)))

        cv2_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
        # cv2.imwrite("reconstructed.jpg", cv2_img)
        result = self.recognition.detect_recognize(cv2_img)

        return json.dumps({'message': 'Success', 'result': result})
