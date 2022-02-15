from django.shortcuts import render
from django.core import serializers as core_serializers
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from .models import *
from .serializers import *
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.parsers import JSONParser, ParseError
import requests
import json
import datetime
from functools import reduce
import operator
from PyDictionary import PyDictionary
from itertools import chain
from .search.globalSearch import GlobalSearch


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRoutes(request):
    routes = [{'id': 0, 'name': 'pradeep'}]
    return Response(routes)


@api_view(['GET', 'POST'])
#@permission_classes([IsAuthenticated])
def word_list(request, format=None):
    if request.method == 'GET':
        words = Word.objects.all()
        serializer = WordSerializer(words, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        request.data["user"] = 1 #request.user.id
        request.data["updatedAt"] = datetime.datetime.now()
        serializer = WordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def word_detail(request, pk, format=None):
    try:
        snippet = Word.objects.get(pk=pk)
    except Word.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = WordSerializer(snippet)
        return Response(serializer.data)

    elif request.method == 'PUT':
        request.data["user"] = request.user.id
        request.data["updatedAt"] = datetime.datetime.now()
        serializer = WordSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def find_text(request, format=None):
    if request.method != 'GET':
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    searchText = request.GET.get('search_text')
    if not searchText:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    searchText = searchText.strip()
    if not searchText:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    return GlobalSearch.get_queryset(searchText)
