FROM mhart/alpine-node:10

WORKDIR /app

COPY package.json ./

RUN npm install --only=prod

COPY . .


EXPOSE 4000
CMD node main.bundle.js