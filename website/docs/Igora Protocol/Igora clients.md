---
sidebar_position: 3
---

# Igora clients

## official client igora_web
```
cp .env-example igora_web/.env
cd igora_web
npm install
npm run dev
```
then open http://127.0.0.1:5173

## OpenAi API compatible client
Can be used to translate OpenAi Api request to Igora request. 

For example works with : 
    - [X] obsidian ollama plugin
    - [X] Microsoft Autogen
    - [X] CrewAi 

```
cd openai
npm install
npm run dev
```
then the openAi Api compatible endpoint can be accessed at http://127.0.0.1:5678/v1/caht/completions
You can open a rudiment ui to test at http://127.0.0.1:5678



## Stackblitz client
- stackblitz https://stackblitz.com/~/github.com/scenaristeur/igora
