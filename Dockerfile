# Dockerfile for Full-Stack Monorepo
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root and package files
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build client app
RUN npm run build

EXPOSE 4000 5173

CMD ["npm", "run", "dev"]
