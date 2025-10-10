FROM node:22.20-alpine

WORKDIR /app

# Copy only package files first to leverage Docker cache for dependencies
COPY package*.json ./

RUN npm install

# Copy the rest of the project files
COPY . .

# Expose Vite's default dev server and json-server
EXPOSE 5173 3001

# Run Vite in dev mode and allow external access
CMD ["npm", "run", "dev", "--", "--host"]
