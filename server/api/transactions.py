import json

from PyQt5.QtCore import QObject, pyqtSlot
from ..utils.serializer import jsonify
from ..queries import transactions

class Transactions(QObject):
    def __init__(self, parent=None):
        super().__init__(parent)

    @pyqtSlot(str, result=str)
    def list_transactions(self, req):
        params = json.loads(req)
        print('query variables', params)

        #result = transactions.get(params['account_num'])
        account_num = params.get('account_num')
        min_amount = params.get('min_amount')
        max_amount = params.get('max_amount')
        start_date = params.get('start_date')
        end_date = params.get('end_date')

        result = transactions.get(account_num, min_amount, max_amount, start_date, end_date)
        
        return jsonify(result)

    @pyqtSlot(str, result=str)
    def create_transaction(self, req):
        params = json.loads(req)
        print('query variables', params)

        from_account_num = params.get('fromAccountNum')
        to_account_num = params.get('toAccountNum')
        description = params.get('description')
        amount = params.get('amount')

        try:
            result = transactions.create(from_account_num, to_account_num, description, amount)
            return jsonify(result)

        except TypeError:
            return "Error"