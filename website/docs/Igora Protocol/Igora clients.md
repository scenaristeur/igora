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
    - [X] Libreoffice [clients/libreoffice/24.2.1/llm/README.md](https://github.com/scenaristeur/igora/tree/main/clients/libreoffice/24.2.1/llm/README.md)
        - exemple "Plantes robotiques" [clients/libreoffice/24.2.1/plantes_robotiques_1.odt](https://github.com/scenaristeur/igora/raw/main/clients/libreoffice/24.2.1/plantes_robotiques_1.odt)

        https://youtu.be/VUpspZo40_M

        [![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/VUpspZo40_M/0.jpg)](https://www.youtube.com/watch?v=VUpspZo40_M)

https://github.com/scenaristeur/igora/raw/main/clients/libreoffice/24.2.1/plantes_robotiques_1.odt

```
cd openai
npm install
npm run dev
```
then the openAi Api compatible endpoint can be accessed at http://127.0.0.1:5678/v1/caht/completions
You can open a rudiment ui to test at http://127.0.0.1:5678



## Stackblitz client
- stackblitz https://stackblitz.com/~/github.com/scenaristeur/igora
