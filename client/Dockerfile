FROM node:12

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /opt/wiki/client

COPY package.json yarn.lock ./

RUN yarn --pure-lockfile

COPY . ./

EXPOSE 9000

CMD ["yarn", "dev"]
