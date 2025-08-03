FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy backend's package files
COPY server/package*.json ./

# Install backend dependencies
RUN npm install --production

# Copy rest of the backend code
COPY server ./

# Expose the port your app runs on (change if needed)
EXPOSE 5000

# Run backend entry point
CMD ["node", "src/app.js"]
