import json

from PyQt5.QtCore import QObject, pyqtSlot
from ..utils.serializer import jsonify
from ..queries import accounts, currency

class Accounts(QObject):
    def __init__(self, parent=None):
        super().__init__(parent)

    @pyqtSlot(str, result=str)
    def list_accounts(self, req):
        params = json.loads(req)
        print('query variables', params)

        user_id = params.get('userId')
        username = params.get('username') or None
        result = accounts.list_accounts(user_id=user_id, username=username) # this is a list of dictionaries

        return jsonify(result)

    @pyqtSlot(str, result=str)
    def get_account(self, req):
        params = json.loads(req)
        print('query variables', params)

        account_num = params.get('accountNum')
        result = accounts.get(account_num=account_num)

        return jsonify(result)
