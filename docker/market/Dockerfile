FROM node:20
WORKDIR /app
# COPY . /usr/src/app
EXPOSE 1234
#CMD "$(if [ $YJS_ENV = 'LOCAL' ] ; then 'PORT=1234 npx y-websocket' ; else "echo LOCAL Market is not running on $YJS_ENV"; fi)"
#&& PORT=1234 npx y-websocket || echo "LOCAL Market is not running on $YJS_ENV"
CMD HOST=market PORT=1234 YPERSISTENCE=./dbDir npx y-websocket