from sqlalchemy.orm import Session

from . import models

# TODO : Add the CRUD operations for the database

def get_token(db: Session, token: str):
    return db.query(models.Team).filter(models.Team.token == token).first()

def get_task_token(db: Session, task: str, token: str):
    return db.query(models.Team).filter(models.Team.task == task, models.Team.token == token).first()

def add_round_token(db: Session, task: str, token: str):
    db.query(models.Team).filter(models.Team.task == task, models.Team.token == token).update({models.Team.round: models.Team.round + 1})
    db.commit()

def get_round_token(db: Session, task: str, token: str):
    return db.query(models.Team).filter(models.Team.task == task, models.Team.token == token).first().round
