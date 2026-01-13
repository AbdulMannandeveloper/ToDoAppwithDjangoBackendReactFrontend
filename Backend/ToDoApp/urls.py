from django.urls import path
import views

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('create_task/', views.create_task, name='create_task'),
    path('update_task/', views.update_task, name='update_task'),
    path('read_task/', views.read_tasks, name='read_task'),
    path('delete_task/', views.delete_task, name='delete_task'),

    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]