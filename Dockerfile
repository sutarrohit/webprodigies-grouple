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

ENV DATABASE_URL="postgresql://postgres.tuljfewfuvlluvljfquy:3IkmVaQIAgDoo6De@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
ENV DIRECT_URL="postgresql://postgres.tuljfewfuvlluvljfquy:3IkmVaQIAgDoo6De@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/group/create
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/group/create
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_cnVsaW5nLWhhcmUtNzQuY2xlcmsuYWNjb3VudHMuZGV2JA"
ENV CLERK_SECRET_KEY="sk_test_Q88F5IKnQ0METMUbNP8bQZESJevcOf9wBqdW8NEqTZ"
ENV NEXT_PUBLIC_STRIPE_PUBLISH_KEY="pk_test_51Q0lY3GnHlXhGelFsu6MyOU9bQx8rb2sxWcEfNh4Dx9NDDeMqqBCo0NNNK9sVCwHvjsmEF0ffVQmj2gS3c0sRDeQ00aaFUfAUT"
ENV STRIPE_SECRET_KEY="sk_test_51Q0lY3GnHlXhGelFEDffCWmLQGo98tvAppk0pJqOgYO69GUE3jIcOeIg6kZpKJHBAekthxWPreA2EvOnpjp49IwU00YqFzrFJa"
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1bGpmZXdmdXZsbHV2bGpmcXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0OTEyNzYsImV4cCI6MjA0MjA2NzI3Nn0.Iopv0BGZA2h31m-RpEx8zLGDy-iI5bT0tVl9tCgYw_M"
ENV NEXT_PUBLIC_SUPABASE_URL="https://tuljfewfuvlluvljfquy.supabase.co"


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




