FROM node:20
WORKDIR /app
COPY . /app
# for y-websocket connector in src should separate all projects
RUN npm install
WORKDIR  /app/openai
RUN npm install

CMD npm run dev