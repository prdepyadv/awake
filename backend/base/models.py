from django.db import models
from django.contrib.auth.models import User
import datetime
import django
from django.db import models
from django.utils import timezone


class Word(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    wordName = models.CharField(max_length=200, null=False, blank=False)
    updatedAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.wordName


class Meaning(models.Model):
    word = models.ForeignKey(Word, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    meaning = models.CharField(max_length=500, null=True, blank=True)
    updatedAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.meaning)
