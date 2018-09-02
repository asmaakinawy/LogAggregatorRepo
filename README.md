# LogAggregatorRepo
## Installation:



- Clone this repo to your local machine using https://github.com/asmaakinawy/LogAggregatorRepo.git

- setup elastic search here https://www.elastic.co/

```shell
$ cd LogAggregatorRepo
$ virtualenv venv -p python3
$ source venv/bin/activate
$ pip install -r requirements/common.txt
$ cd aggregator
$ python manage.py runserver
```
- create user http://127.0.0.1:8000/api/v1/create_user/
- create log data http://127.0.0.1:8000/api/v1/create_log/
- list your Logs py your api-key http://127.0.0.1:8000/api/v1/list_log
django admin credentials :
email :admin@task.com
password: admin123
