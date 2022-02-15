from django.urls import path

from . import views

app_name = 'ask_me'
urlpatterns = [
    path('', views.index, name='home'),
    path('search/', views.search, name='index'),
    path('key/', views.find, name='find'),
    path('question/<int:question_id>/', views.getDetail, name='detail'),
    path('question/<int:question_id>/results/', views.results, name='results'),
    path('question/<int:question_id>/delete/', views.deleteQuestion, name='delete'),
    path('question/lastest-10', views.lastestQuestions, name='lastedQuestions'),
    path('answer/update/', views.updateAnswer, name='updateAnswer'),
    path('answer/delete/', views.deleteAnswer, name='deleteAnswer'),
    path('answer/save-new/', views.saveAnswer, name='saveAnswer'),
    path('answer/<int:answer_id>/add-like', views.addLike, name='addLike'),
    path('answer/<int:answer_id>/add-dislike',
         views.addDislike, name='addDislike')
]