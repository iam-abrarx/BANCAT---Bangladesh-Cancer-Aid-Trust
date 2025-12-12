# Stage 1: Build
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve
# We don't necessarily need a running container here if we just want artifacts,
# but often we use a standalone nginx for frontend.
# However, if we use a single Nginx for both, we can just copy artifacts to a shared volume.
# Let's assume standalone for clarity or shared volume.
# For this Dockerfile, let's make it a serving container.
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
