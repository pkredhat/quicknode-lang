# Use the official Node.js image from the Docker Hub
FROM node:14

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the app directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the app directory
COPY . .

# Expose the port your app runs on (replace 3000 with your app's port if different)
EXPOSE 3000

# Command to start the Node.js app
CMD ["node", "index.js"]
