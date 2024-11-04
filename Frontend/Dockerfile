# Dockerfile for React (Frontend)
FROM node:22.9.0

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies first
COPY package*.json ./
RUN npm install

# Install 'wait-for-it' script to wait for backend if needed
RUN curl -o ./wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x ./wait-for-it.sh

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 5173

# Run the React development server
CMD ["npm", "run", "dev"]
