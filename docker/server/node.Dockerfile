FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Copy source code to image
COPY . .

WORKDIR /usr/src/app/explorer-server
RUN npm i
EXPOSE 3002

# Install dependencies
RUN npm install

# Build app and start server from script
CMD ["/usr/src/app/run"]