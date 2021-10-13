import logging

from PyQt5.QtCore import QObject, pyqtSlot
from server.database import engine
from server.database.tables import user_table
from server.utils.serializer import jsonify
from sqlalchemy import select
from sqlalchemy.exc import NoResultFound

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

class User(QObject):
    def __init__(self, parent=None):
        super().__init__(parent)
    
    @pyqtSlot(str, result=str)
    def get_user(self, name):
        with engine.connect() as conn:
            try:
                result = conn.execute(select(user_table).where(user_table.c.name == name)).one()
            except NoResultFound:
                return 'no results'
            
            return jsonify(result)
