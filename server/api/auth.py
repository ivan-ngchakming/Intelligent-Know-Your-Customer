import base64
import io
import json
import logging

import cv2
from imageio import imread
from PyQt5.QtCore import QObject, pyqtSlot

from ..queries import login_history, users
from ..recognition.app import Recognition
from ..utils.serializer import jsonify


logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


class Auth(QObject):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.recognition = None

    def load_model(self, user_id):
        user_name = users.get(user_id=user_id)['name']
        if self.recognition is not None:
            if self.recognition.user_name == user_name:
                return
        
        self.recognition = Recognition(user_name)

    @pyqtSlot(str, int, result=str)
    def login(self, img_base64, user_id):
        self.load_model(user_id)

        # reconstruct image as an numpy array
        img = imread(io.BytesIO(base64.b64decode(img_base64)))

        cv2_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
        result = self.recognition.detect_recognize(cv2_img)
        logger.debug(f'Logging in {result}')
        return json.dumps({'message': 'Success', 'result': result})

    @pyqtSlot(str, result=str)
    def log_login(self, req):
        params = json.loads(req)
        logger.debug('query variables', params)

        if login_history.get_current_count() >= 1:
            return 'already logged in'

        login_history.create(params['user_id'], params['confidence'])

        return 'success'
        
        
    @pyqtSlot(str, result=str)
    def login_history(self, req):
        params = json.loads(req)
        result = login_history.list_all(params['user_id'])

        return jsonify(result)

    @pyqtSlot(str, result=str)
    def logout(self, req):
        logger.debug("Logging out")
        params = json.loads(req)
        login_history.update_logout_date(params['user_id'])
        return 'success'
