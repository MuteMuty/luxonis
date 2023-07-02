# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the frontend
RUN npm run build

# Expose the port that the frontend will be served on
EXPOSE 3000

# Start a web server to serve the built frontend
CMD ["npm", "start"]
