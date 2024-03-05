FROM node
# https://github.com/yjs/y-websocket/blob/master/Dockerfile
# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
# WORKDIR /home/node/app
# COPY package*.json ./
# USER node
# RUN npm install
# COPY --chown=node:node . .
RUN PORT=1234 npx y-websocket
EXPOSE 1234
CMD [ "npm", "start" ]