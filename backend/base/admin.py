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
