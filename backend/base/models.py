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


class Question(models.Model):
    questionText = models.TextField()
    pubDate = models.DateTimeField('Date published')
    updatedAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)

    def __str__(self):
        return self.questionText

    def was_published_recently(self):
        return self.pubDate >= timezone.now() - datetime.timedelta(days=1)

    class Meta:
        ordering = ("questionText", "pubDate")


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.TextField(default=None)
    approve = models.IntegerField(default=0)
    disapprove = models.IntegerField(default=0)
    postedOn = models.DateTimeField(
        'Date posted', default=django.utils.timezone.now)
    updatedAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)

    def __str__(self):
        return self.answer
