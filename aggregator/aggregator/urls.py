
from django.conf.urls import url, include
from django.contrib import admin
from profiles.views import UserCreateAPI, LogCreateAPI, LogListAPI, LogDeleteAPI
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^auth/', include('rest_framework_social_oauth2.urls')),
    url(r'^api/v1/create_user/?$', UserCreateAPI.as_view()),
    url(r'^api/v1/create_log/?$', LogCreateAPI.as_view()),
    url(r'^api/v1/log_list/?$', LogListAPI.as_view()),
    url(r'^api/v1/delete_log/(?P<log_id>\w+)/?$', LogDeleteAPI.as_view()),
#
]
