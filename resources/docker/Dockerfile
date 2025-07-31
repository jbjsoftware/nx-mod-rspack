# Multi-stage build for Nx module federation apps
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy nx configuration
COPY nx.json tsconfig.base.json ./

# Copy source code
COPY src/ ./src/
COPY jest.config.ts jest.preset.js ./
COPY eslint.base.config.mjs eslint.config.mjs ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Set environment variables for production build
ENV NODE_ENV=production
ENV NX_DAEMON=false

# Build all applications (build target already has production args configured)
RUN pnpm exec nx build host
RUN pnpm exec nx build dashboard  
RUN pnpm exec nx build connections

# Production stage
FROM nginx:alpine AS production

# Copy custom nginx configuration
COPY resources/docker/nginx.conf /etc/nginx/nginx.conf

# Copy built applications from builder stage
COPY --from=builder /app/dist/src/apps/host /usr/share/nginx/html
COPY --from=builder /app/dist/src/remotes/dashboard /usr/share/nginx/html/remotes/dashboard
COPY --from=builder /app/dist/src/remotes/connections /usr/share/nginx/html/remotes/connections

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
