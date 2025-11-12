# Stage 1: Build the React application
# Use a specific, stable version of Node.js
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or bun.lockb)
# Using package*.json to catch both
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Run the build script defined in package.json
RUN npm run build

# Stage 2: Serve the static files with Nginx
# Use a lightweight, official Nginx image
FROM nginx:1.25-alpine

# Copy the built files from the 'builder' stage (Vite's default output is 'dist')
COPY --from=builder /app/dist /usr/share/nginx/html

# Tell Docker the container listens on port 80
EXPOSE 80

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]