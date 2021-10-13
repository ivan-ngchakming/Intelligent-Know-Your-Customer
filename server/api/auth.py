import base64
import io
import json
import logging
import pickle
import datetime

import cv2
from imageio import imread
from PyQt5.QtCore import QObject, pyqtSlot
from server.database import engine
from server.database.tables import login_history_table
from server.recognition.app import Recognition
from server.utils.serializer import jsonify
from sqlalchemy import select, insert, update

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

class Auth(QObject):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.recognition = Recognition()
        labels = {"person_name": 1}
        with open(f"server/recognition/models/labels.pickle", "rb") as f:
            labels = pickle.load(f)
            labels = {v: k for k, v in labels.items()}
            logger.info("Labels for Face ID loaded")
            logger.debug(labels)

    @pyqtSlot(str, int, result=str)
    def login(self, img_base64, user_id):
        # reconstruct image as an numpy array
        img = imread(io.BytesIO(base64.b64decode(img_base64)))

        cv2_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
        result = self.recognition.detect_recognize(cv2_img)
        logger.debug(f'Logging in {result}')
        return json.dumps({'message': 'Success', 'result': result})

    @pyqtSlot(str, result=str)
    def log_login(self, req):
        params = json.loads(req)
        print('query variables', params)

        with engine.connect() as conn:
            result = conn.execute(insert(login_history_table),
            [
                {'user_id': params['user_id'], 'confidence': params['confidence']},
            ])
            conn.commit()

        return 'success'
        
        
    @pyqtSlot(str, result=str)
    def login_history(self, req):
        params = json.loads(req)
        print('query variables', params)

        with engine.connect() as conn:
            result = conn.execute(
                select(login_history_table)
                .where(login_history_table.c.user_id==params['user_id'])
                .order_by(login_history_table.c.login_date.desc())
                .limit(5)
            )

            return jsonify(result)

    @pyqtSlot(str, result=str)
    def logout(self, req):
        with engine.connect() as conn:
            params = json.loads(req)
            result = conn.execute(
                update(login_history_table)
                .where(
                    login_history_table.c.user_id == params['user_id'], 
                    login_history_table.c.logout_date == None
                ),
                [{'logout_date': datetime.datetime.now()}]
            )
            conn.commit()
            return 'success'
