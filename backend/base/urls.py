from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('words/', views.word_list, name="words"),
    path('word/<str:pk>/', views.word_detail, name="word"),
    path('questions/', views.question_list, name="questions"),
    path('question/<str:pk>/', views.question_detail, name="question"),
    path('search', views.find_text, name="search")
]

urlpatterns = format_suffix_patterns(urlpatterns)
