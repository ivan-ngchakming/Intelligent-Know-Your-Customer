from sqlalchemy import insert, select

from server.database import engine
from server.database.tables import model_table


def get(user_id):
    with engine.connect() as conn:
        stmt = (
            select(model_table)
            .where(model_table.c.user == user_id)
        )

        result = conn.execute(stmt)

        return dict(result.one())


def create(user_id, path):
    with engine.connect() as conn:
        conn.execute(insert(model_table),
        [
            {'path': path, 'user': user_id},
        ])
        conn.commit()
    
    return get(user_id)