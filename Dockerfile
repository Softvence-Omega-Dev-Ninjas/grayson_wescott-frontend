# Stage 1: build
FROM node:24-slim AS builder
WORKDIR /app

# Install system dependencies required for sharp/lightningcss
RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    libc6-dev \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy only package files first
COPY package*.json ./

# Install all dependencies (prod + dev for build)
RUN npm ci --include=optional

# Copy source code
COPY . .

# Build Next.js (needs dev deps like TypeScript)
RUN npm run build

# Stage 2: production image
FROM node:24-slim
WORKDIR /app

# Install system dependencies for runtime (sharp needs libvips)
RUN apt-get update && apt-get install -y \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy only necessary files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/components.json ./

# Expose port and start
EXPOSE 3000
CMD ["npm", "run", "start"]
