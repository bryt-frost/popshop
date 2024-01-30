from PIL import Image
from django.core.exceptions import ValidationError
import os
def validate_icon_size(image):
    if image:
        with Image.open(image) as img:
            if image.width > 70 or image.height > 70:
                raise ValidationError(f"The maximum allowed dimension for the image is 70x70. Size of image uploaded {image.size}")


def validate_image_file_extension(value):
    ext = os.path.splitext(value.name)[1]
    valid_extensions = [".jpg", ".png", ".jpeg", ]
    if not ext.lower() in valid_extensions:
        raise ValidationError(f"Unsupported file extension. Image should be of any of .jpg, png or jpeg")