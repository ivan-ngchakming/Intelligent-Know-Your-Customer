import logging
import json
import base64
import io
import cv2

from imageio import imread
from PyQt5.QtCore import pyqtSlot, QObject
from server.database import engine
from sqlalchemy import select

from server.utils.serializer import jsonify
from server.recognition.app import Recognition
from server.database.tables import user_table, login_history_table


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

    @pyqtSlot(str, result=str)
    def login_history(self, req):
        params = json.loads(req)
        print('query variables', params)

        with engine.connect() as conn:
            result = conn.execute(
                select(login_history_table)
                .where(login_history_table.c.user_id==params['user_id'])
            )

            return jsonify(result)