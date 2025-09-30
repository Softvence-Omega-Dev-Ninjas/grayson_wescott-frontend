# Stage 1: build
FROM node:24-slim AS builder
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install

# Copy only package files first
COPY package.json package-lock.json* ./

# Install only production deps for final image
RUN npm ci

# Copy source code
COPY . ./

# Build Next.js
RUN npm run build

# Stage 2: production image
FROM node:24-slim
WORKDIR /app

# Copy only the necessary build output and prod deps
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/components.json ./

# Expose port and start
EXPOSE 3000
CMD ["npm", "run", "start"]
