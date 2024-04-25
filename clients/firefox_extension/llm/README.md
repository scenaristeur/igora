# annotate-page

## What it does

This example adds a sidebar that lets you take notes on the current web page. The notes are saved to local storage, and the notes for each page are shown again when you open that page again.

The example also uses the `commands` manifest key to add a keyboard shortcut that opens the sidebar.

## What it shows

How to create a sidebar for an add-on. How to associate the sidebar with the currently active tab in that sidebar's window. How to store and restore sidebar content.

# host-permissions
- https://javascript.plainenglish.io/fetch-data-in-chrome-extension-v3-2b73719ffc0e


# installation 
Firefox : ouvrir la page about:debugging et installer l'extension en choisissant le manifeste.json




# adapter openai module

dans igora/openai/index.js

adapter la ligne `const allowedOrigins = ["*", 'moz-extension://26aa4c94-c5f9-4cfd-bf78-7cf92fe3877b']; //const allowedOrigins = ['http://localhost:*', "http://127.0.0.1:*", "app://obsidian.md"];
`
avec le bon identifiant d'extension