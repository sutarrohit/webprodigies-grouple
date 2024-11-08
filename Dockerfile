# Use Node LTS version with Alpine Linux
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the project
RUN npm run build

# Expose the port your app runs on (e.g., 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
