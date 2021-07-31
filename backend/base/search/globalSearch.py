from rest_framework.response import Response
from ..models import *
from ..serializers import *
from django.dispatch import receiver
from rest_framework import status
from functools import reduce
import operator
from PyDictionary import PyDictionary
from itertools import chain


class GlobalSearch():
    def get_queryset(searchText):
        if not searchText:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        searchText = searchText.strip()
        if not searchText:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        searchTextList = searchText.split(' ')
        searchTextList.append(searchText)

        #search in all models
        questions = reduce(operator.or_, (
            Question.objects.filter(questionText__icontains=text)
            for text in searchTextList))
        answers = reduce(operator.or_, (
            Answer.objects.filter(answer__icontains=text)
            for text in searchTextList))
        words = reduce(operator.or_, (
            Word.objects.filter(wordName__icontains=text)
            for text in searchTextList))
        meanings = reduce(operator.or_, (
            Meaning.objects.filter(meaning__icontains=text)
            for text in searchTextList))

        results = chain(questions, answers, words, meanings)
        if len(list(results)):
            questions = QuestionSerializer(questions, many=True)
            words = WordSerializer(words, many=True)
            answers = AnswerSerializer(answers, many=True)
            meanings = MeaningSerializer(meanings, many=True)
            return Response(questions.data + words.data + answers.data + meanings.data)


        """ Try Again - Synonym Game """
        searchTextList = searchText.split(' ')
        newSearchList = []
        for search in searchTextList:
            dictionary = PyDictionary()
            searchList = dictionary.synonym(search)
            if searchList:
                newSearchList.append(search)
                newSearchList += searchList

        if newSearchList:
            questions = reduce(operator.or_, (
                Question.objects.filter(questionText__icontains=text)
                for text in newSearchList))
            answers = reduce(operator.or_, (
                Answer.objects.filter(answer__icontains=text)
                for text in newSearchList))
            words = reduce(operator.or_, (
                Word.objects.filter(wordName__icontains=text)
                for text in newSearchList))
            meanings = reduce(operator.or_, (
                Meaning.objects.filter(meaning__icontains=text)
                for text in newSearchList))

            results = chain(questions, answers, words, meanings)
            if results:
                print('hi')
                questions = QuestionSerializer(questions, many=True)
                words = WordSerializer(words, many=True)
                answers = AnswerSerializer(answers, many=True)
                meanings = MeaningSerializer(meanings, many=True)
                return Response(questions.data + words.data + answers.data + meanings.data)

        return Response(status=status.HTTP_404_NOT_FOUND)
