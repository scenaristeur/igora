FROM node
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm run fix
RUN cp .env-example .env
#RUN cp .env igora_web/.env
RUN cd igora_web && npm install
EXPOSE 1234/udp
EXPOSE 1234/tcp
EXPOSE 5173
CMD ./start.sh