# Use an official Node.js runtime as the base image
FROM node:20-alpine

RUN npm install -g nodemon

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the backend is listening on
EXPOSE 4000

# Start the backend server
CMD ["npm", "run", "api"]
