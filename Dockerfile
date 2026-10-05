# Development image
FROM node:18-alpine AS development

# Install dependencies only when needed
FROM development AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /Users/emilychen/Documents/sharly
COPY package.json package-lock.json* ./
RUN npm install

# Rebuild the source code only when needed
FROM deps AS builder
WORKDIR /Users/emilychen/Documents/sharly
COPY . .
RUN npm install

# Development server
FROM node:18-alpine AS dev
WORKDIR /Users/emilychen/Documents/sharly

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy files from the builder stage with correct ownership
COPY --from=builder --chown=nextjs:nodejs /Users/emilychen/Documents/sharly/public ./public
COPY --from=builder --chown=nextjs:nodejs /Users/emilychen/Documents/sharly/.next ./.next

# Set correct permissions for prerender cache
# RUN chown -R 1000:1000 .next

# Switch to the non-root user
USER nextjs

# Expose the application port
EXPOSE 3000

# Set the command to run the application during development
CMD ["npm", "run", "dev"]