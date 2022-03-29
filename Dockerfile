FROM node:16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

copy . .

RUN npm install


EXPOSE 5000
CMD ["node", "index.js"]