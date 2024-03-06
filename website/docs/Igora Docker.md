
# Run Igora in Docker

## build Igora Image

For now all three services are in the same Dockerfile what is not a good solution but it works. You can check the Dockerfile in the root folder of the igora project.

- first verify that you have docker installed
- verify info in the two .env files (the one in the root folder and the one in the igora_web folder) as it is embarked in the builded image (i know i should pass it to the run process instead, feel free to contribute)



- build the image with the following command
 ```
 docker build -t igora .
 ```
- then run the image with the following command

 ```

docker run --rm -d --name igora -v ./models:/usr/src/app/models -p 1234:1234/tcp -p 1234:1234/udp -p 5173:5173 --net="host" igora
```

- to stop the container use ```docker stop igora```


# node-llama-cpp-beta-v3

```npm install node-llama-cpp@beta --save ```

