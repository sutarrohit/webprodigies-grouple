# Multi-stage build

# Base image with Node.js
FROM node:20-alpine3.19 AS base

# Stage 1: Build the application
FROM base AS build-stage
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY ./package*.json ./
RUN npm install --legacy-peer-deps

# Copy the entire application code and build it
COPY . .
RUN npm run build

# Stage 2: Production stage
FROM base AS production-stage
WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy only necessary files from the build stage
COPY --from=build-stage /app/package*.json ./
COPY --from=build-stage /app/.next ./.next
COPY --from=build-stage /app/public ./public
COPY --from=build-stage /app/next.config.ts ./next.config.ts

# Install only production dependencies
RUN npm install --omit=dev

# Expose the Next.js default port
EXPOSE 3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system -uid 1001 nodejs

USER nodejs

# Start the application
CMD ["npm", "run", "start"]




