# ---- Build Stage ----
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy source and config files
COPY . .

# Generate Prisma client and compile TypeScript
RUN npx prisma generate && npx tsc

# ---- Production Stage ----
FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm ci --omit=dev --ignore-scripts

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 8000

CMD ["node", "dist/index.js"]
