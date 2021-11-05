from sqlalchemy import text
from . import accounts

from server.database import engine


# insert new transaction into database and update account balance
def create(from_account_num, to_account_num, description, amount, date=None):
    trans_date = "DEFAULT" if (date is None) else (f"'{date}'")

    from_account_currency = accounts.get(account_num=from_account_num)['currency']
    to_balance = accounts.update_balance(to_account_num, amount, from_account_currency)
    from_balance = accounts.update_balance(from_account_num, -1 * amount, from_account_currency)

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
        filterText += f"AND (IF (from_account_num = {account_num}, -amount >= {min_amount}, amount >= {min_amount})) "
    if (max_amount is not None):
        filterText += f"AND (IF (from_account_num = {account_num}, -amount <= {max_amount}, amount <= {max_amount})) "
    if (start_date is not None):
        filterText += f"AND date >= '{start_date}' "
    if (end_date is not None):
        filterText += f"AND date <= '{end_date}' "

    with engine.connect() as conn:
        query = text(
            f"""
            SELECT
                t.id,
                from_account_num,
                to_account_num,
                DATE_FORMAT(`date`, '%Y-%m-%d') AS date,
                DATE_FORMAT(`date`, '%l:%i %p') AS time,
                description,
                IF(from_account_num = {account_num}, -amount, amount * er.rate) as amount,
                IF(from_account_num = {account_num}, from_balance, to_balance) as balance,
                er.rate
            FROM
                `transaction` AS t
            JOIN
                account AS from_acc ON from_acc.account_num = t.from_account_num
            JOIN
                account AS to_acc ON to_acc.account_num = t.to_account_num
            JOIN
                exchange_rate er
            ON
                er.from_currency = from_acc.currency AND
                er.to_currency = to_acc.currency
            WHERE
                (from_account_num = {account_num} OR
                to_account_num = {account_num})
                {filterText}
            ORDER BY
                date DESC, time DESC
            """
        )
        result = conn.execute(query)
        return [dict(row) for row in result.all()]
