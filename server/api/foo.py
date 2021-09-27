import json

from PyQt5.QtCore import pyqtSlot, QObject

from server.utils.serializer import jsonify
from server.database import engine
from sqlalchemy import text


class Foo(QObject):
    def __init__(self, parent=None):
        super().__init__(parent)

    @pyqtSlot(str, result=str)
    def foo(self, req):
        myobject = json.loads(req)

        print('My Object', myobject)

        return jsonify(myobject)

    @pyqtSlot(str, result=str)
    def foo2(self, req):
        myobject = json.loads(req)
        print('query variables', myobject)

        with engine.connect() as conn:
            result = conn.execute(text("select 'hello world'"))

            return jsonify(result)
