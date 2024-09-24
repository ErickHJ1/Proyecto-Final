FROM node:22.9.0
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*
RUN curl -o ./wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]