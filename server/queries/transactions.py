from sqlalchemy import text
from . import accounts

from server.database import engine


# insert new transaction into database and update account balance
def create(from_account_num, to_account_num, description, amount, date=None):
    trans_date = "DEFAULT" if (date is None) else (f"'{date}'")

    to_balance = accounts.update_balance(to_account_num, amount)
    from_balance = accounts.update_balance(from_account_num, -1 * amount)

    with engine.connect() as conn:
        query = text(
            f"""
            INSERT INTO
                transaction (from_account_num, to_account_num, description, amount, date, from_balance, to_balance)
            VALUES
                ({from_account_num}, {to_account_num}, '{description}', {amount}, {trans_date}, '{from_balance}', '{to_balance}')
            """
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
            f"""
            SELECT
                id,
                DATE_FORMAT(date, '%Y-%m-%d') AS date,
                DATE_FORMAT(date, '%l:%i %p') AS time,
                description,
                IF(from_account_num = {account_num}, -amount, amount) as amount,
                IF(from_account_num = {account_num}, from_balance, to_balance) as balance
            FROM
                transaction
            WHERE
                from_account_num = {account_num} OR
                to_account_num = {account_num}
                {filterText}
            ORDER BY
                date DESC
            """
        )
        result = conn.execute(query)
        return [dict(row) for row in result.all()]
