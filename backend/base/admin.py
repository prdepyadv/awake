from .models import Answer, Question
from django.utils.html import format_html
from django.utils.http import urlencode
from django.urls import reverse
from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(Word)
class WordAdmin(admin.ModelAdmin):
    list_display = ("wordName", "createdAt", "updatedAt", "view_meanings")
    list_filter = ("wordName", )
    search_fields = ("wordName__contains", )
    fields = ("wordName", "updatedAt")

    def view_meanings(self, obj):
        count = obj.meaning_set.count()
        url = (
            reverse("admin:base_meaning_changelist")
            + "?"
            + urlencode({"meaning__id": f"{obj._id}"})
        )
        return format_html('<a href="{}">{} Meanings</a>', url, count)

    view_meanings.short_description = "Meanings"

@admin.register(Meaning)
class MeaningAdmin(admin.ModelAdmin):
    list_display = ("word", "meaning", "updatedAt", "createdAt")
    list_filter = ("word", "meaning")
    search_fields = ("meaning__contains", )


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ("questionText", "pubDate", "updatedAt", "view_answers")
    list_filter = ("pubDate", )
    search_fields = ("questionText__contains", )
    fields = ("questionText", "pubDate")

    def view_answers(self, obj):
        count = obj.answer_set.count()
        url = (
            reverse("admin:base_answer_changelist")
            + "?"
            + urlencode({"answers__id": f"{obj.id}"})
        )
        return format_html('<a href="{}">{} Answers</a>', url, count)

    view_answers.short_description = "Answers"


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ("question", "answer", "approve", "disapprove", "postedOn", "updatedAt")
    list_filter = ("approve", "disapprove")
    search_fields = ("answer__contains", )
