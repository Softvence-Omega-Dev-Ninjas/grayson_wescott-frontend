# Use Node.js 24-slim image
FROM node:24-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json .

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Environment variables
ENV NEXT_PUBLIC_BASE_URL=https://carbonengines.com
ENV NEXT_PUBLIC_BASE_API=https://carbonengines.com/api
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=125659000169-4incakt8jp20jhifol0h39u9pipe6g0r.apps.googleusercontent.com
ENV NEXT_PUBLIC_FACEBOOK_APP_ID=25474619458797594

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Run the app
CMD ["npm", "run", "start"]
