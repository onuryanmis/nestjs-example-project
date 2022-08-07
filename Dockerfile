FROM node:18-alpine
WORKDIR /home/node/app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD [ "node", "dist/main.js" ]