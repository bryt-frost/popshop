from django.db import models
import uuid


class TimeStampModel(models.Model):
    """Adds date created and modified to the model automatically"""

    created = models.DateTimeField(auto_now_add=True, db_index=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Extensions(models.Model):
    """Best practice for lookup field url instead pk or slug"""

    generated_uuid = uuid.uuid4()

    # Convert the UUID to a string and remove hyphens
    formatted_uuid = str(generated_uuid).replace("-", "")

    # Split the string into two parts
    uuid_split = formatted_uuid[:5] + formatted_uuid[5:10]

    uuid = models.CharField(
        db_index=True, default=uuid_split, editable=False, max_length=10
    )
    created = models.DateTimeField(auto_now_add=True, db_index=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
