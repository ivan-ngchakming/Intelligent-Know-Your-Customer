import decimal
import datetime
import json


from sqlalchemy.engine.cursor import CursorResult
from sqlalchemy.engine.row import Row


def alchemyencoder(obj):
    """JSON encoder function for SQLAlchemy special classes.
    
    Example
    -------
    res = conn.execute(select([accounts]))
    json_str = json.dumps([dict(r) for r in res], default=alchemyencoder)

    """
    if isinstance(obj, datetime.date):
        return obj.isoformat()
    elif isinstance(obj, decimal.Decimal):
        return float(obj)


def jsonify(obj):
    if isinstance(obj, CursorResult):
        return json.dumps([dict(r) for r in obj], default=alchemyencoder)
    elif isinstance(obj, Row):
        return json.dumps(dict(obj), default=alchemyencoder)
    else:
        return json.dumps(obj, default=alchemyencoder)
