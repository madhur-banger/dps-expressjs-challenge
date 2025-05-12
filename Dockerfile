# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy only necessary files for dependency installation
COPY package*.json ./

# Install only production deps first to use Docker cache effectively
RUN npm ci --omit=dev

# Copy the whole app
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Run
FROM node:20-alpine

WORKDIR /app

# Copy built app from previous stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Define environment and port
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["node", "dist/index.js"]
