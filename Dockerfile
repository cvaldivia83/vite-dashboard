FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy only package files first to leverage Docker cache for dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose Vite's default dev server port
EXPOSE 5173 3001

# Run Vite in dev mode and allow external access
CMD ["npm", "run", "dev", "--", "--host"]
