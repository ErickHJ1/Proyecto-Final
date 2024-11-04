# Dockerfile for Django (Backend)
FROM python:3.12.5

# Set the working directory
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY requirements.txt ./
RUN pip install -r requirements.txt --no-cache-dir

# Add wait-for-it script to wait for MySQL to be ready
RUN curl -o ./wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x ./wait-for-it.sh

# Copy the rest of the Django app code
COPY . .

# Expose the Django port
EXPOSE 8000
