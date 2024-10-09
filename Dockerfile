FROM nginx:latest

# Copy the dist directory
COPY dist /usr/share/nginx/html