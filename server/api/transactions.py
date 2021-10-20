import json

from PyQt5.QtCore import QObject, pyqtSlot
from ..utils.serializer import jsonify

# replace with data from database
dummyRows = [
  { 'id':1,  'date': '2021-03-02', 'time': '10:21AM', 'description': 'dummyRows', 'amount':100, 'balance': 200},
  { 'id':2,  'date': '2017-03-02', 'time': '9:21PM', 'description': 'dummyRows', 'amount':-200, 'balance': 200},
  { 'id':3,  'date': '2021-02-02', 'time': '10:21AM', 'description': 'dummyRows', 'amount':10, 'balance': 200},
]

dummyRows1 = [
  { 'id':1,  'date': '2021-03-02', 'time': '10:21AM', 'description': 'dummyRows1', 'amount':'100', 'balance': 200},
  { 'id':2,  'date': '2017-03-02', 'time': '9:21PM', 'description': 'dummyRows1', 'amount':'-200', 'balance': 200},
  { 'id':3,  'date': '2021-02-02', 'time': '10:21AM', 'description': 'dummyRows1', 'amount':'10', 'balance': 200},
  { 'id':4,  'date': '2021-09-02', 'time': '10:21AM', 'description': 'dummyRows1', 'amount':'2000', 'balance': 200},
  { 'id':5,  'date': '2019-03-31', 'time': '10:21AM', 'description': 'dummyRows1', 'amount':100, 'balance': 200},
  { 'id':6,  'date': '2021-03-02', 'time': '10:21AM', 'description': 'dummyRows1', 'amount':100, 'balance': 200},
]

class Transactions(QObject):
    def __init__(self, parent=None):
        super().__init__(parent)

    @pyqtSlot(str, result=str)
    def list_transactions(self, req):
        params = json.loads(req)
        print('query variables', params)

        if ('minAmount' in params and params['minAmount'] == 1):
            result = dummyRows1
        else:
            result = dummyRows
        return jsonify(result)
