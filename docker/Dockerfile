FROM node:current-buster-slim

WORKDIR /logs

COPY . .

RUN apt update

RUN apt install curl python -y

RUN npm install

RUN npm install -g pm2

RUN npm run build

CMD ["pm2-runtime", "./dist/server.js"]
