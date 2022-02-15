import datetime
import django
from django.db import models
from django.utils import timezone

class Question(models.Model):
    question_text = models.TextField()
    pub_date = models.DateTimeField('Date published')

    def __str__(self):
        return self.question_text

    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)

    class Meta:
        ordering = ("question_text", "pub_date")


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.TextField(default=None)
    approve = models.IntegerField(default=0)
    disapprove = models.IntegerField(default=0)
    posted_on = models.DateTimeField(
        'Date posted', default=django.utils.timezone.now)

    def __str__(self):
        return self.answer
