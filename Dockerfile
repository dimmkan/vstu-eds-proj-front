#STAGE 1
FROM node:14-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g @angular/cli@12.2.5
COPY . .
CMD ng serve --host 0.0.0.0