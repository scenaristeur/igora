
# Run Igora in Docker

## Build Igora Image

For now all three services are in the same Dockerfile what is not a good solution but it works. You can check the Dockerfile in the root folder of the igora project.

- first verify that you have docker installed
- verify info in the .env file 
- run ```docker compose up```

if needed to rebuild, run ```docker compose up --build```



<!-- - build the image with the following command
 ```
 docker build -t igora .
 ```
- then run the image with the following command

 ```

docker run --rm -d --name igora -v ./models:/usr/src/app/models -p 1234:1234/tcp -p 1234:1234/udp -p 5173:5173 --net="host" igora
```

- to stop the container use ```docker stop igora``` -->