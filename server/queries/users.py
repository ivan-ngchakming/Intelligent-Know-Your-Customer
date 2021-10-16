from sqlalchemy import insert, select

from server.database import engine
from server.database.tables import user_table


def get(name=None, user_id=None):
    with engine.connect() as conn:
        stmt = select(user_table)
        
        if name is not None:
            stmt = stmt.where(user_table.c.name == name)
        elif user_id is not None:
            stmt = stmt.where(user_table.c.user_id == user_id)
        else:
            raise Exception("no parameters provided to select user")

        result = conn.execute(stmt)

        return dict(result.one())


def create(name):
    with engine.connect() as conn:
        conn.execute(insert(user_table),
        [
            {'name': name},
        ])
        conn.commit()
    
    return get(name)