FROM node:22-alpine

ARG APP_PORT=9000 

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install 

COPY src/ ./src/

EXPOSE $APP_PORT 

CMD ["npm", "run", "dev"]