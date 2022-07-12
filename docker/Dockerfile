FROM node:current-buster-slim

WORKDIR /logs

COPY . .

RUN apt update

RUN apt install curl -y

RUN npm install

RUN npm install -g pm2

CMD ["pm2-runtime", "./dist/server.js"]