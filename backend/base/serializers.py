from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = '__all__'


class MeaningSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meaning
        fields = '__all__'

