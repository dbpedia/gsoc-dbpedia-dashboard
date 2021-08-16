FROM python:3.8-slim
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./
RUN pip install -r requirements.txt
CMD exec gunicorn --bind :5000 --workers 1 --threads 8 --timeout 0 app:app