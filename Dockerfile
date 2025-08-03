FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy only backend package files
COPY server/package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the backend source code
COPY server ./

# Expose the port your app listens on
EXPOSE 3000

# Run the backend app
CMD ["node", "src/app.js"]
