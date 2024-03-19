---
sidebar_label: 'Installation'
sidebar_position: 2
---



# Installation
If you have questions or issues, please [contact the community](./help)

# Hardware
- No GPU needed, works on a CPU laptop
- Tested on a cheap [Lenovo IdeaPad 3 15ALC6](https://www.google.com/search?client=firefox-b-lm&q=ideapad+3+15alc6) with 16CPU and 16 GB Ram
- Tested on a VirtualBox Xubuntu image with 4 CPU and 4 GB Ram
- See [Igora Workers](./Igora%20Protocol/Igora%20workers) or [Igora Docker](./Igora%20Docker) for more examples


# Prerequisites
- Linux
- git
- nodejs >=20
- wget for downloading models, or download it manually

## Igora backend
### Install Igora

```bash
git clone https://github.com/scenaristeur/igora
cd igora
npm install
npm run fix
```

### Download a model

Igora workers are based on [node-llama-cpp](https://withcatai.github.io/node-llama-cpp/) that uses [gguf](https://github.com/ggerganov/ggml/blob/master/docs/gguf.md) format models. 

([llama-cpp-python](https://llama-cpp-python.readthedocs.io/en/latest/) could be used too in future)

In this installation we will use the [dolphin-2.2.1-mistral-7b.Q2_K.gguf](https://huggingface.co/TheBloke/dolphin-2.2.1-mistral-7B-GGUF) model, but feel free to choose another model and update your .env file with the good model name.

- [Available models](https://huggingface.co/TheBloke?search_models=gguf&sort_models=downloads#models). Open this page, chose a model (7B or less are a good point to start as they need less memory) then look at "Files and versions" and download the model. A Q2, Q3 or Q4 according to the Ram your machine can provide.

You can download a gguf model manually and store it in ./models folder then update the MODEL_NAME in your .env 

ex : `LLM_MODEL_NAME="dolphin-2.2.1-mistral-7b.Q2_K.gguf"`

Here are two different ways to download the model :

```
npx ipull -s ./models https://huggingface.co/TheBloke/dolphin-2.2.1-mistral-7B-GGUF/resolve/main/dolphin-2.2.1-mistral-7b.Q2_K.gguf
```

or with wget 

```
wget -O ./models/dolphin-2.2.1-mistral-7b.Q2_K.gguf https://huggingface.co/TheBloke/dolphin-2.2.1-mistral-7B-GGUF/resolve/main/dolphin-2.2.1-mistral-7b.Q2_K.gguf?download=true
```



### The 3 .env files
For now, we use 3 ***.env*** files : 
- ***.env-example*** in igora root folder : this is the default example of the environment file that you can copy to create your .env file
- ***.env*** in igora root folder : this is your .env file, it is read by the igora backend to configure the workers and determine the model, the mode you want to use (LOCAL or REMOTE) , the url of the y-websocket server and the market room.
- ***.env*** in ***igora_web*** folder : this one is used by the web app / client ! be carefull , all the settings in igora_web/.env file MUST to start with "VUE_" to be accessed by the web app.

Copy the .env-example file to .env

```
cp .env-example .env
```


example of .env file
```
YJS_ENV=LOCAL # LOCAL, REMOTE
YJS_LOCAL_URL="ws://localhost:1234" # your LOCAL y-websocket server
YJS_REMOTE_URL="wss://ylm-websocket.glitch.me/" # the REMOTE y-websocket server
YJS_MARKET_ROOM="market"
LLM_MODEL_NAME="dolphin-2.2.1-mistral-7b.Q2_K.gguf"

```

For now, you must create your frontend .env in igora_web folder.

igora_web/.env file :
```
VITE_YJS_ENV=LOCAL # LOCAL, REMOTE
VITE_YJS_LOCAL_URL="ws://localhost:1234" # your LOCAL y-websocket server
VITE_YJS_REMOTE_URL="wss://ylm-websocket.glitch.me/" # the REMOTE y-websocket server
VITE_YJS_MARKET_ROOM="market"
```

### Launch Igora backend
```bash
npm run start

```

## Igora market

To run a local market on the port 1234 of your machine, just open a new terminal, cd to a folder where there is no package.json and run ```PORT=1234 npx y-websocket```.


## Igora client, webapp

To run the client, verify that igora_web/.env file is correctly set with the same VITE_YJS_URL and VITE_YJS_ENV variables as the .env in the main folder then run 

```
cd igora_web
npm install
npm run dev
```

the client is running on http://localhost:5173




