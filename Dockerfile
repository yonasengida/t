# Dockerfile for users service

FROM node:8.5.0

MAINTAINER Yonas Engida <yengida@gmail.com>

ADD . /home/users

WORKDIR /home/users

RUN npm install

EXPOSE 8880

ENTRYPOINT ["node", "app.js"]
