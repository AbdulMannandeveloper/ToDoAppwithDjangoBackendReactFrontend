from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Tasks(models.Model):
    task = models.CharField(max_length=500)
    is_done = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.task