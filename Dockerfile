FROM node:12
WORKDIR /usr/src/app
COPY . .

RUN npm run server:install
RUN npm run ts:build

EXPOSE 4000
CMD [ "node", "./dist/app.js" ]