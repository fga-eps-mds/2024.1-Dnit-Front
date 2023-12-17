FROM node:18 as build

WORKDIR /app

COPY package.json ./

RUN yarn --ignore-scripts

COPY . .

RUN yarn build

FROM nginx:latest

COPY ci/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

