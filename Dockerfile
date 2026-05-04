# Stage 1: Build the Frontend
FROM node:22-alpine AS frontend-build
WORKDIR /app/frontend
COPY os-tracker-frontend/package*.json ./
RUN npm install
COPY os-tracker-frontend/ ./
RUN npm run build

# Stage 2: Setup the Backend
FROM node:22-alpine
WORKDIR /app
COPY os-tracker-backend/package*.json ./
RUN npm install --production
COPY os-tracker-backend/ ./

# Copy frontend build to backend directory
# (Assuming your server.js looks in ../os-tracker-frontend/dist)
RUN mkdir -p ../os-tracker-frontend/dist
COPY --from=frontend-build /app/frontend/dist ../os-tracker-frontend/dist

# Environment variables
ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]
