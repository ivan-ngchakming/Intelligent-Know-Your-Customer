import datetime

from sqlalchemy import select, insert, update, text, func

from server.database import engine
from server.database.tables import login_history_table


def get_current_count():
    with engine.connect() as conn:
        result = conn.execute(
            select(func.count('*'))
            .select_from(login_history_table)
            .where(login_history_table.c.logout_date == None)
        )
        return result.all()[0][0]
    

def create(user_id, confidence):
    with engine.connect() as conn:
        conn.execute(insert(login_history_table),
        [
            {'user_id': user_id, 'confidence': confidence},
        ])
        conn.commit()


def list_all(user_id):
    with engine.connect() as conn:
        stmt = text(f"""
            SELECT
                user_id, login_date, logout_date, confidence, 
                TIMEDIFF(logout_date, login_date) as duration
            FROM
                login_history
            WHERE
                user_id = {user_id}
            ORDER BY
                login_date DESC
            LIMIT
                5
        """)
        result = conn.execute(stmt)
        return [dict(row) for row in result.all()]


def update_logout_date(user_id):
    with engine.connect() as conn:
        conn.execute(
            update(login_history_table)
            .where(
                login_history_table.c.user_id == user_id, 
                login_history_table.c.logout_date == None
            ),
            [{'logout_date': datetime.datetime.now()}]
        )

        conn.commit()
