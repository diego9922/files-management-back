FROM node:latest

ARG PROJECT_PATH=/home/node/
RUN npm i -g @nestjs/cli
COPY ./ $PROJECT_PATH
WORKDIR $PROJECT_PATH
RUN npm install
CMD ["npm", "run", "start:dev"]