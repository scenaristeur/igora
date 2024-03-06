# Igora Protocol
***Large Language Model everywhere.***
***Les larges modèles de langage partout, pour tout le monde.***

- Documentation in [English](https://scenaristeur.github.io/igora/)
- Documentation en [Français](https://scenaristeur.github.io/igora/fr/)





- No GPU needed
- runs on my [Lenovo IdeaPad 3 15ALC6](https://www.google.com/search?client=firefox-b-lm&q=ideapad+3+15alc6) with 16CPU and 16 GB Ram
- see notebook https://github.com/scenaristeur/igora/blob/main/igora.ipynb
- [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/scenaristeur/igora/blob/main/igora.ipynb)
- another [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/14lxt1XwkFtAAMauZzYsWEn7z2uKzUpzR?usp=sharing)

broker for https://github.com/scenaristeur/catay

# todo 
- [ ] should be compatible with OpenAi API for stream https://cookbook.openai.com/examples/how_to_stream_completions, tiktoken to count
- [ ] possibilité de prioriser les demandes locales, ou liste de prioritaires, workers debrayables, ou 2 workers, un pour les demandes locales, un pour les remote

# prerequist
- Linux
- nodejs


# get Igora
```
git clone https://github.com/scenaristeur/igora.git
cd igora
npm install
npm run fix
# download a gguf llm model like https://huggingface.co/TheBloke/dolphin-2.2.1-mistral-7B-GGUF
# available models : https://huggingface.co/TheBloke?search_models=gguf
# or use `sh download_model.sh`
wget -O ./models/dolphin-2.2.1-mistral-7b.Q2_K.gguf https://huggingface.co/TheBloke/dolphin-2.2.1-mistral-7B-GGUF/resolve/main/dolphin-2.2.1-mistral-7b.Q2_K.gguf?download=true


```

# KNOWN BUG
the two following bugs can be fixed with `npm run fix`

- 1 https://github.com/yjs/y-websocket/issues/170

```
(node:21742) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
/home/user/dev/igora/node_modules/y-websocket/src/y-websocket.js:7
import * as Y from 'yjs' // eslint-disable-line
^^^^^^

SyntaxError: Cannot use import statement outside a module

```
 --> go to node_modules/

 ![Alt text](/doc/images/y-websocket_bug.png)


- 2 https://github.com/yjs/y-websocket/pull/173/commits/69ddb2c49ac73e76b1ab8b2876d24fe94a153819

replace node_modules/y-websocket/src/y-websocket.js by 

https://raw.githubusercontent.com/yjs/y-websocket/69ddb2c49ac73e76b1ab8b2876d24fe94a153819/src/y-websocket.js


# local market
if you want to use a local y-websocket server use 
run outside a project with type:module as y-websocket server is commonjs
```
PORT=1234 YPERSISTENCE=./dbDir npx y-websocket

PORT=1234 npx y-websocket
```


# install
- copy .env-example to .env ` cp .env-example .env`
- adapt your .env file to your need
- run with `npm run start`

# params 
params can be added to command line or in .env file

default 
yjs_env : "remote"
yjs_url: 

YJS_ENV=remote # local, remote
YJS_LOCAL_URL="ws://localhost:1234" # your local y-websocket server
YJS_REMOTE_URL="wss://ylm-websocket.glitch.me/" # the remote y-websocket server
YJS_MARKET_ROOM="market"



# adapt client 
in igoraweb/src/lib/user.js, set wsProvider according to y-websocket server t=you defined
```
const wsProvider = new WebsocketProvider(
  //'ws://localhost:9999',
  //'ws://localhost:1234',
  'wss://ylm-websocket.glitch.me',
  'market',
  doc
)
```

# start
dans 3 terminaux

Lancement du worker llm
```
npm run start
```
lancement du serveur y-websocket d'échange de donnée

```
cd ~
PORT=1234 npx y-websocket
```

lancement du frontend sur http://localhost:5173

```
cd igora_web
npm install
npm run dev
```


# based on
- node-llama-cpp [https://github.com/edfletcher/node-llama-cpp](https://withcatai.github.io/node-llama-cpp/) / https://github.com/withcatai/node-llama-cpp
- y-websocket https://github.com/yjs/y-websocket
- y-leveldb https://github.com/yjs/y-leveldb todo
- y-protocols https://github.com/yjs/y-protocols
- sould do with llama-cpp python server




# storage
? https://docs.storj.io/


# node-red
- https://nodered.org/docs/getting-started/local
```
npm install -g node-red
```

# see llama http docker
- https://github.com/edfletcher/llama.http/tree/master/examples/simple-http


# run on colab ?
- run Igora on Google colab : https://colab.research.google.com/drive/14lxt1XwkFtAAMauZzYsWEn7z2uKzUpzR?usp=sharing

- only two cpu but my laptop is more efficient with 16 CPU and 16 GB Ram

- https://medium.com/@yufengg/how-to-upgrade-colab-with-more-compute-64d53a9b05dc
- https://console.cloud.google.com/marketplace/browse?filter=solution-type:vm

# free vps server
- https://www.youtube.com/watch?v=07as5Sf8Sz0
- https://vpssos.com/blog/buy-16-core-vps-in-2023.html#_1-vultr
- github codespace https://www.youtube.com/watch?v=edHyPPfc9QY
- -> https://sturdy-carnival-vqx6vvr79g2649.github.dev/

- lightnode $52.7 / month : https://go.lightnode.com/france-vps?ref=1179805e&id=45 for 8cpu
- 120 days free https://vpssos.com/free-vps-hosting/#_6-linuxone
- https://www.hostingadvice.com/how-to/free-vps-hosting/

# expériences
- SP : 
 user : Une baguette de pain est-elle plus chère ou moins chère qu'une coupe de cheveux ? Réponds étape par étape et explique ton raisonnement 
 
- SP : Etablit une liste de dix fruits, et classe les du plus cher au moins cher
P : user : Etablit une liste de dix fruits, et classe les du plus cher au moins cher 

- SP : Tu es un écrivain romancier et tu dois décrire la scénario demandée par l'utilisateur avec un maximum de détails.
tu dois décrire les personnages qui s'y trouvent, l'ambiance, ce qu'ils font et tu dois imaginer une intrigue
- prompt : un bar la nuit dans une ruelle sombre
- temperature 07
- model vicuna-7b-v1.5-16k.Q2_K.gguf
- assistant : Le scénario se déroule dans un bar de nuit situé dans une ruelle sombre d'une petite ville. Le personnage principal, qui est un écrivain romancier, arrive au bar en fin de semaine pour essayer de trouver l'inspiration pour son prochain livre. Il a entendu parler du bar de nuit et il souhaitait explorer le lieu pour y trouver des idées pour son prochain livre. ### Scénario: Le personnage principal s'installe à sa table, prêt à commencer son quête d'inspiration. Il remarque alors un groupe de personnes qui discutent en écoutant musique sur des écouteurs. Il se rapproche d'eux pour écouter et il découvre qu'ils parlent d'une affaire de meurtre. Les témoins entendent la conversation, mais ils ne veulent pas s'impliquer. Le personnage principal commence à interagir avec les autres clients du bar. Il rencontre un homme qui travaille dans une entreprise de sécurité privée et il lui propose de l'aider à trouver le meurtrier en échange de 500 $ récompense. Le personnage accepte la proposition et il commence sa mission pour trouver le meurtrier. Le personnage découvre bientôt que la victime était un ancien ennemi du propriétaire du bar, qui avait des affaires illégales avec les autorités locales. Le propriétaire du bar est lui-même suspect dans l'affaire de meurtre et il cherche à dissimuler ses activités criminelles. Le personnage principal commence à enquêter sur le propriétaire du bar, il découvre que celui-ci a un passé criminel et qu'il est impliqué dans des activités de contrebande illégales avec une autre ville voisine. Il découvre également que le propriétaire a un compte secret dans un banque locale et qu'il utilise cette banque pour dissimuler sa richesse. Le personnage principal continue son enquête en interagissant avec les autres clients du bar, il découvre que l'un d'entre eux est un ancien associé de la victime, qui a été victime de l'affaire elle-même. Il découvre également qu'il existe un traître dans le groupe des témoins, car ils ont tous refusé de témoigner en cour de justice. Le personnage principal finit par trouver le meurtrier grâce à son enquête et il décide de faire arrêter le propriétaire du bar pour ses activités criminelles. Il apporte également la preuve qu'il y a un traître parmi les témoins en tuant l'un d'entre eux. Il utilise ensuite cette preuve pour faire condamner le propriétaire du bar en justice et il récupère la somme de 500 $ promettue par l'homme travaillant dans une entreprise de sécurité privée. Le personnage retourne ensuite au bar pour trouver de l'inspiration pour son prochain livre, mais il est interrompu par les crimes commis par le propriétaire du bar et la police qui arrive pour prendre le suspect en custodia. Il décide d'attendre que tout soit terminé avant de continuer son quête d'inspiration dans le bar de nuit sombre. 
--> peu satisfaisant


# message history
- model vicuna-7b-v1.5-16k.Q2_K.gguf
```
system : Tu es un assistant chargé de répondre au mieux à la demande de l'utilisateur
user : Bonjour, je m'appelle David et j'ai 45 ans
assistant : Bonjour David, ça va ? Comment puis-je vous aider aujourd'hui ?
user : Quel est mon prénom et quel est mon âge ?
assistant : Votre prénom est David et vous avez 45 ans.
user : quel âge aurais-je dans deux ans ?
assistant : D'après mes calculs, en deux ans, vous aurez 47 ans. 
```

# New Docker
docker compose --env-file .env-local  config
docker compose --env-file .env-remote  config

docker compose --env-file .env --env-file .env-local up
docker compose --env-file .env --env-remote .env-local up

docker compose --env-file .env --env-file .env-local up --build

docker compose up




# Docker (move oldDocker files to root folder)
- https://openclassrooms.com/fr/courses/2035766-optimisez-votre-deploiement-en-creant-des-conteneurs-avec-docker/6211567-utilisez-des-images-grace-au-partage-sur-le-docker-hub

docker build -t igora .

docker run --rm -d --name igora -v ./models:/usr/src/app/models -p 1234:1234/tcp -p 1234:1234/udp -p 5173:5173 --net="host" igora

# test docker perfs
- managed with portainer
docker run --rm -d --name igora -v ./models:/usr/src/app/models --cpus=4 --memory=8g --net="host" igora --> 200% cpu


or without -d 
-> docker run --rm --name igora -v ./models:/usr/src/app/models -p 1234:1234/tcp -p 1234:1234/udp -p 5173:5173 --net="host" igora
you can see the logs and wait for the "broker" and "worker" connected

```
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.0.30:5173/
  ➜  Network: http://172.17.0.1:5173/
[20:8:30]	 [YJS][Broker] connecting
[20:8:30]	 [YJS][worker1] connecting
[20:8:31]	 [YJS][Broker] connecting
[20:8:31]	 [YJS][worker1] connecting
[20:8:31]	 [YJS][Broker] connecting
[20:8:31]	 [YJS][worker1] connecting
[20:8:33]	 [YJS][Broker] connecting
[20:8:33]	 [YJS][worker1] connecting
running at 'localhost' on port 1234
[20:8:35]	 [YJS][Broker] connecting
[20:8:35]	 [YJS][worker1] connecting
[20:8:35]	 [YJS][Broker] connected
[20:8:35]	 [YJS][worker1] connected

```




--> front is running on http://localhost:5173

exit in another terminal with ```docker stop igora``` (Ctrl+C does not work here because aof the start.sh script) 


access the container with ```docker exec -it igora bash```

# using remote decentralized with docker 
change locale to remote in .env, in .env-example and in igora_web/.env then rebuilt docker image with ```docker build -t igora .``` and re-run the container with ```docker run --rm -d --name igora -v ./models:/usr/src/app/models -p 1234:1234/tcp -p 1234:1234/udp -p 5173:5173 --net="host" igora```



# test doc

```js npm run start -- --locale fr ```
cd website && npm run build 