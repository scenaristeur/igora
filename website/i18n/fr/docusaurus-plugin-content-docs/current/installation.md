---
sidebar_label: 'Installation'
sidebar_position: 2
---



# Installation
Si vous des problèmes ou des questions, n'hésitez pas à [interroger la communauté](./help)

# Hardware
- Vous n'avez pas forcément besoin d'une carte graphique GPU coûteuse, fonctionne sur un ordinateur portable CPU.
- Testé sur un [Lenovo IdeaPad 3 15ALC6](https://www.google.com/search?client=firefox-b-lm&q=ideapad+3+15alc6) basique avec 16CPU et 16 GB Ram.
- Testé sur une image VirtualBox Xubuntu avec 4CPU et 4GB Ram
- Jetez un oeil aux pages [Igora Workers](./Igora%20Protocol/Igora%20workers) ou [Igora Docker](./Igora%20Docker) pour plus d'exemples

# Prérequis
- Linux 
- git
- nodejs > 20
- wget pour télécharger les modèles, ou vous pouvez les télécharger manuellement

## Igora serveur backend
### Installation d'Igora

```bash
git clone https://github.com/scenaristeur/igora
cd igora
npm install
```

### Télécharger un modèle de language
Les workers Igora sont basés sur [node-llama-cpp](https://withcatai.github.io/node-llama-cpp/) qui utilisent des modèles au format [gguf](https://github.com/ggerganov/ggml/blob/master/docs/gguf.md).

([llama-cpp-python](https://llama-cpp-python.readthedocs.io/en/latest/) pourra également être utilisé)

Dans cette installation, nous allons utiliserle modèle [dolphin-2.2.1-mistral-7b.Q2_K.gguf](https://huggingface.co/TheBloke/dolphin-2.2.1-mistral-7B-GGUF), mais vous pouvez choisir un autre modèle, à condition de mettre à jour le fichier .env avec le bon nom de modèle.

- [Modèles disponbles](https://huggingface.co/TheBloke?search_models=gguf&sort_models=downloads#models). Ouvrez cette page, choississez le modèle qui vous convient (7B ou moins sont un bon point de départ, car ils consomment moins de mémoire), ensuite ouvrez l'onglet "Files and versions" et téléchargez le modèle (les modèles Q2 à Q4 sont plus légers, donc conseillés).

Vous pouvez télécharger un modèle ***gguf*** manuellement et le déplacer dans le dossier ./models, sans oublier de mettre à jour votre fichier .env.

ex : `LLM_MODEL_NAME="dolphin-2.2.1-mistral-7b.Q2_K.gguf"`

Voici deux manières pour télécharger un modèle :

```
npx ipull -s ./models https://huggingface.co/TheBloke/dolphin-2.2.1-mistral-7B-GGUF/resolve/main/dolphin-2.2.1-mistral-7b.Q2_K.gguf
```

ou avec wget 

```
wget -O ./models/dolphin-2.2.1-mistral-7b.Q2_K.gguf https://huggingface.co/TheBloke/dolphin-2.2.1-mistral-7B-GGUF/resolve/main/dolphin-2.2.1-mistral-7b.Q2_K.gguf?download=true
```

### Les 3 fichiers .env
A l'heure actuelle, Igora utilise 3 fichiers ***.env*** : 
- ***.env-example*** dans le dossier racine d'igora : c'est le fichier exemple de l'environnement par défaut que vous pouvez copier pour créer votre fichier de configuration .env.
- ***.env*** dans le dossier racine d'igora : c'est votre fichier .env de configuration, il est lu par le serveur igora pour configurer les workers et déterminer le modèle à utiliser, le mode que vous souhaitez utiliser (local ou décentralisé), ainsi que l'url et la room du market.
- ***.env*** dans le dossier ***igora_web*** : celui-ci est utilisé par l'application web. Attention toutes les constantes dans l fichier igora_web/.env file DOIVENT commencer par "VUE_" por être accessible par l'application web.

Copier le fichier .env-example vers .env

```
cp .env-example .env
```


exemple de fichier .env
```
YJS_ENV=local # local, remote
YJS_LOCAL_URL="ws://localhost:1234" # your local y-websocket server
YJS_REMOTE_URL="wss://ylm-websocket.glitch.me/" # the remote y-websocket server
YJS_MARKET_ROOM="market"
LLM_MODEL_NAME="dolphin-2.2.1-mistral-7b.Q2_K.gguf"

```

A l'heure actuelle, vous devez créer votre fichier .env manuellement dans le dossier ***igora_web***

fichier igora_web/.env :
```
VITE_YJS_ENV=local # local, remote
VITE_YJS_LOCAL_URL="ws://localhost:1234" # your local y-websocket server
VITE_YJS_REMOTE_URL="wss://ylm-websocket.glitch.me/" # the remote y-websocket server
VITE_YJS_MARKET_ROOM="market"
```



### Lancement du serveur Igora
```bash
npm run start

```

## Igora market

Pour lancer un ***merket*** local sur le port 1234 de votre machine. Ouvrez un nouveau terminal, déplacez-vous dans un dossier ne contenant pas de fichier package.json et lancez la commande ```PORT=1234 npx y-websocket```.


## client Igora, application web

Pour lancer un client, vérifiez que le fichier de configuration igoraweb_client/.env est correctement configuré avec les variables d'environnement `VITE_YJS_URL` et `VITE_YJS_ENV` identiques que dans le fichier .env du dossier racine.

Lancer ensuite les commandes 

```
cd igora_web
npm install
npm run dev
```
Le client devrait être accessible à l'adresse http://localhost:5173




