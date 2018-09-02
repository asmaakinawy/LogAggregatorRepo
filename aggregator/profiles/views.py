from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from django.conf import settings
from .models import User
import datetime
from rest_framework.permissions import IsAuthenticated

es = settings.ES_CLIENT

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


class UserCreateAPI(APIView):
    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


class LogCreateAPI(APIView):
    def post(self, request, format=None):
        time = datetime.datetime.now()

        api_key = request.data.get('api_key')
        if not api_key:
            return Response({"error": "you must provide an api key"}, status=status.HTTP_400_BAD_REQUEST)
        if not User.objects.filter(api_key=api_key).exists():
            return Response({"error": "Wrong api key provided"}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data.get('data')
        if not data:
            return Response({"error": "Please enter your log data into data field"}, status=status.HTTP_400_BAD_REQUEST)
        if type(data) is not dict:
            return Response({"error": "Wrong data format"}, status=status.HTTP_400_BAD_REQUEST)

        ip_address = get_client_ip(request)

        doc = {"data": data, "source": ip_address, "timestamp": time, "api_key": api_key}
        res = es.index(index="logging", doc_type='log', body=doc)

        return render(res, status=status.HTTP_201_CREATED)

class LogListAPI(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):

        api_key = request.user.api_key
        res = []
        results = es.search(index="logging", filter_path=["hits.hits._id", "hits.hits._source"],
                            body={"_source": {"excludes": ["api_key"]}, "query": {"match": {"api_key": api_key}}})
        if results:
            for r in results['hits']['hits']:
                data = r['_source']
                data.update({"id": r['_id']})
                res.append(data)

        return render(res)

class LogDeleteAPI(APIView):

    permission_classes = (IsAuthenticated,)
    def delete(self, request, log_id, format=None):
        es.delete(index="logging", doc_type="log", id=log_id)
        return Response(status=status.HTTP_204_NO_CONTENT)