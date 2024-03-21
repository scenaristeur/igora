FROM node:20
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run fix
#COPY . /app
# RUN npm install
# RUN npm run fix
CMD npm run start