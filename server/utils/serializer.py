import decimal
import datetime
import json


from sqlalchemy.engine.cursor import CursorResult


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


def alchemyjsonify(res):
    """Jsonify CursorResults from SQLAlchemy queries."""
    return json.dumps([dict(r) for r in res], default=alchemyencoder)


def jsonify(obj):
    if isinstance(obj, CursorResult):
        return alchemyjsonify(obj)
    else:
        return json.dumps(obj)
