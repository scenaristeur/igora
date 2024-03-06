FROM node:20
WORKDIR /app
COPY ./igora_web /app
RUN npm install
EXPOSE 5173
CMD npm run dev && echo "Igora is running on port 5173"