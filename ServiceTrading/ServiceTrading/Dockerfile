FROM python:3.12.5
WORKDIR /app
COPY requirements.txt ./
RUN pip install -r requirements.txt --no-cache-dir
COPY wait-for-it.sh ./
RUN chmod +x ./wait-for-it.sh
COPY . .
EXPOSE 8000