const { Readable } = require('stream');
const { openai } = require('@openai/api');

// Créer un flux lisible
const readableStream = new Readable({
  read() {}
});

// Envoyer le message initial
readableStream.push(JSON.stringify({ role: "user", content: "Say this is a test" }));
readableStream.push(null); // Signaler la fin du flux

// Créer une fonction asynchrone pour traiter les réponses du modèle
async function processStream() {
  // Créer le flux avec OpenAI
  const stream = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    parameters: {
      stream: true
    },
    headers: {
      'Content-Type': 'application/json'
    },
    body: readableStream
  });

  // Lire et afficher les réponses du flux
  stream.body.pipe(process.stdout);
}

// Appeler la fonction pour démarrer le processus de streaming
processStream().catch(console.error);