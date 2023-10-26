from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include
from .import views

app_name="stream"

urlpatterns=[
    path('home/',views.index,name='home'),
    path('add/',views.add, name='add')
]