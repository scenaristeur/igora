---
sidebar_label: 'Installation'
sidebar_position: 2
---



# Installation
If you have questions or issues, please [contact the community](./help)

# Hardware
- No GPU needed, works on a CPU laptop
- tested on a [Lenovo IdeaPad 3 15ALC6](https://www.google.com/search?client=firefox-b-lm&q=ideapad+3+15alc6) with 16CPU and 16 GB Ram
- tested on a VirtualBox Xubuntu image with 4 CPU and 4 GB Ram
- see [Igora Workers](./Igora%20Protocol/Igora%20workers)  or [Igora Docker](./Igora%20Docker) for more examples


# prerequisites
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

Igora workers are based on [node-llama-cpp](https://withcatai.github.io/node-llama-cpp/) that uses the [gguf](https://www.google.com/search?q=what+is+%22gguf%22+model&client=firefox-b-lm&sca_esv=21cc0bb16a8a9ef4&biw=1440&bih=783&sxsrf=ACQVn0_FOvhng6QJisXUmX43ARBI-ZwHZA%3A1709674828672&ei=TJHnZfHSKLf3kdUP2aOZQA&ved=0ahUKEwjxqOCGi96EAxW3e6QEHdlRBggQ4dUDCBA&uact=5&oq=what+is+%22gguf%22+model&gs_lp=Egxnd3Mtd2l6LXNlcnAiFHdoYXQgaXMgImdndWYiIG1vZGVsMgcQABiABBgTSMEiUJUQWJkacAJ4AJABAJgBd6AB3QWqAQM2LjK4AQPIAQD4AQGYAgmgAqwFwgIKEAAYRxjWBBiwA8ICBhAAGAcYHpgDAIgGAZAGBJIHAzcuMqAHwwk&sclient=gws-wiz-serp) model. 

([llama-cpp-python](https://llama-cpp-python.readthedocs.io/en/latest/) could be used too)

In this installation we will use [dolphin-2.2.1-mistral-7b.Q2_K.gguf](https://huggingface.co/TheBloke/dolphin-2.2.1-mistral-7B-GGUF) but feel free to choose another model and update your .env file with the good model name.

- [available models](https://huggingface.co/TheBloke?search_models=gguf&sort_models=downloads#models) open this page, chose a model (7B or less are a good point to start as they need less memory) then look at "Files and versions" and download the model a Q2, Q3 or Q4 according to the Ram your machine can provide

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



### the .env file
There are 3 .env files : 
- .env-example in igora folder : this is the default example file that you can copy to create your .env file
- .env in igora folder : this is your .env file, it is read by the igora backend to configure the workers and determine the model, the mode you want to use (local or remote) , the url of the y-websocket server and the market room.
- .env in igora_web folder : this one is used by the web app / client ! be carefull , all the settings in igora_web/.env file need to start with "VUE_" to be accessed by the web app

Copy the .env-example file  to .env

```
cp .env-example .env
```


example of .env file
```
YJS_ENV=local # local, remote
YJS_LOCAL_URL="ws://localhost:1234" # your local y-websocket server
YJS_REMOTE_URL="wss://ylm-websocket.glitch.me/" # the remote y-websocket server
YJS_MARKET_ROOM="market"
LLM_MODEL_NAME="dolphin-2.2.1-mistral-7b.Q2_K.gguf"

```

create your frontend .env
 in igora_web folder

 igora_web/.env file :
```
VITE_YJS_ENV=local # local, remote
VITE_YJS_LOCAL_URL="ws://localhost:1234" # your local y-websocket server
VITE_YJS_REMOTE_URL="wss://ylm-websocket.glitch.me/" # the remote y-websocket server
VITE_YJS_MARKET_ROOM="market"
```



### Launch igora backend
```bash
npm run start

```

## Igora market

to run a local market on port 1234 just open a new terminal and cd to a folder where there is no package.json and run ```PORT=1234 npx y-websocket```


## Igora client

to run the client
verify that igora_web/.env file is correctly set with the VITE_YJS_URL and VITE_YJS_ENV variables than the .env in the main folder then run 

```
cd igora_web
npm install
npm run dev
```

the client is running on http://localhost:5173




