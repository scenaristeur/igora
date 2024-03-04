# Igora

- No GPU needed
- runs on my [Lenovo IdeaPad 3 15ALC6](https://www.google.com/search?client=firefox-b-lm&q=ideapad+3+15alc6) with 16CPU and 16 GB Ram
- [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/14lxt1XwkFtAAMauZzYsWEn7z2uKzUpzR?usp=sharing)
- see notebook https://github.com/scenaristeur/igora/blob/main/igora.ipynb
- [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/scenaristeur/igora/blob/main/igora.ipynb)

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
# or use `sh download_model.sh`
wget -O /content/igora/models/dolphin-2.2.1-mistral-7b.Q2_K.gguf https://huggingface.co/TheBloke/dolphin-2.2.1-mistral-7B-GGUF/resolve/main/dolphin-2.2.1-mistral-7b.Q2_K.gguf?download=true


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
- github codespace https://www.youtube.com/watch?v=edHyPPfc9QY
- -> https://sturdy-carnival-vqx6vvr79g2649.github.dev/