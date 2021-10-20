from sqlalchemy import select, insert, update, text
from . import accounts

from server.database import engine
from server.database.tables import transaction_table


# insert new transaction into database and update account balance
def create(account_num, description, amount, date=None):
    trans_date = "DEFAULT" if (date is None) else (f"'{date}'")
    balance = accounts.update_balance(account_num, amount)
    with engine.connect() as conn:
        query = text(
            f"INSERT INTO transaction (account_num, description, amount, date, balance) "
            f"VALUES ({account_num}, '{description}', {amount}, {trans_date}, '{balance}')"
        )
        conn.execute(query)
        conn.commit()

# retrieve transaction records
def get(account_num, min_amount, max_amount, start_date, end_date):
    filterText = ""
    if (min_amount is not None):
        filterText += f"AND amount >= {min_amount} "
    if (max_amount is not None):
        filterText += f"AND amount <= {max_amount} "
    if (start_date is not None):
        filterText += f"AND date >= '{start_date}' "
    if (end_date is not None):
        filterText += f"AND date <= '{end_date}' "

    with engine.connect() as conn:
        query = text(
            f"SELECT id, DATE_FORMAT(date, '%Y-%m-%d') AS date, DATE_FORMAT(date, '%l:%i %p') AS time, "
            f"description, amount, balance FROM transaction "
            f"WHERE account_num = {account_num} {filterText}"
            f"ORDER BY date DESC"
        )
        result = conn.execute(query)
        return [dict(row) for row in result.all()]
