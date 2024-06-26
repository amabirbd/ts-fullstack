# Use the official Node.js image as a base image
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 4000

# Build the TypeScript code
RUN npm run build

# Specify the command to run the application
CMD ["npm", "start"]
