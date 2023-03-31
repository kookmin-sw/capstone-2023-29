from typing import Optional

from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()
DBSessionLocal: Optional[sessionmaker] = None
db_engine: Optional[Engine] = None


def init_db(db_url: str) -> None:
    global DBSessionLocal, db_engine

    db_engine = create_engine(
        db_url,
        **{
            "pool_size": 16,
            "max_overflow": 32,
            "pool_timeout": 120,
            "convert_unicode": True,
            "pool_pre_ping": True,
        }
    )

    DBSessionLocal = sessionmaker(autoflush=True, bind=db_engine)


def provide_db_session():
    if DBSessionLocal is None:
        raise ImportError("You need to call init_db before this function")
    db_session = DBSessionLocal()
    try:
        yield db_session
    except:
        db_session.rollback()
        raise
    else:
        db_session.commit()
    finally:
        db_session.close()