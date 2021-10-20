import datetime

from sqlalchemy import select, insert, update, text
from sqlalchemy import func

from server.database import engine
from server.database.tables import account_table

# get all accounts of a user, or get account details by account_num
def get(user_id=None, account_num=None):
    print('TODO')

# create new account and return the account number
def create(user_id, account_type, balance, currency):
    with engine.connect() as conn:
        query = text(
            f"INSERT INTO account (owner, balance, account_type, currency) "
            f"VALUES ({user_id}, {balance}, '{account_type}', '{currency}')"
        )
        conn.execute(query)
        conn.commit()

        query = text(
            f"SELECT * FROM account WHERE owner = {user_id} "
            f"ORDER BY account_num DESC LIMIT 1"
        )
        result = conn.execute(query)
        return dict(result.first())
