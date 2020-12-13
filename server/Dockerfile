FROM node:12

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /opt/wiki/server

COPY package.json yarn.lock ./
RUN yarn --pure-lockfile

COPY . ./

COPY ./wait-for-it.sh /usr/local/wait-for-it.sh
RUN chmod +x /usr/local/wait-for-it.sh

EXPOSE 9001

CMD ["yarn", "dev"]
