# MindGarden React Native Development Container
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install Expo CLI globally
RUN npm install -g expo-cli @expo/cli

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Expose Expo dev server port
EXPOSE 8081

# Start development server
CMD ["npm", "start"]