---
sidebar_label: 'Installation'
sidebar_position: 2
---



# Installation
if you have questions, please [contact us](./help)

# Hardware
- No GPU needed
- tested on my [Lenovo IdeaPad 3 15ALC6](https://www.google.com/search?client=firefox-b-lm&q=ideapad+3+15alc6) with 16CPU and 16 GB Ram
- tested on a VirtualBox python 3.10 Machine with 4 CPU and 4 GB Ram
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



# the .env file
There are 3 .env files : 
- .env-example in igora folder : this is the default example file that you can copy to create your .env file
- .env in igora folder : this is your .env file, it is read by the igora backend to configure the workers and determine the model, the mode you want to use (local or remote) , the url of the y-websocket server and the market room.
- .env in igora_web folder : this one is used by the web app / client ! be carefull , all the settings in igora_web/.env file need to start with "VUE_" to be accessed by the web app


example of .env file
```
YJS_ENV=local # local, remote
YJS_LOCAL_URL="ws://localhost:1234" # your local y-websocket server
YJS_REMOTE_URL="wss://ylm-websocket.glitch.me/" # the remote y-websocket server
YJS_MARKET_ROOM="market"
LLM_MODEL_NAME="dolphin-2.2.1-mistral-7b.Q2_K.gguf"

```

### Launch igora backend
```bash
npm run start

```