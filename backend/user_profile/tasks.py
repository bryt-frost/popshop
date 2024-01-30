from celery import shared_task
from celery.schedules import crontab
import time


def print_hello():
    print("Hello")


CELERY_BEAT_SCHEDULE = {
    "print-hello-every-minute": {
        "task": "user_profile.tasks.print_hello",
        "schedule": crontab(minute="*/1"),
        "schedule": 10.0,
    },
}
