// https://github.com/withcatai/node-llama-cpp/discussions/176#discussioncomment-8731898



import {fileURLToPath} from "url";
import path from "path";
import {getLlama, LlamaModel, LlamaContext, LlamaChatSession} from "node-llama-cpp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const llama = await getLlama({gpu: false});
const model = new LlamaModel({
    llama,
    modelPath: path.join(__dirname, "../models", "dolphin-2.2.1-mistral-7b.Q2_K.gguf")
});
const context = new LlamaContext({
    model,
    contextSize: Math.min(4096, model.trainContextSize)
});
const session = new LlamaChatSession({
    contextSequence: context.getSequence()
});


const q1 = "Je m'appelle David, je développe des application avec des llm et vuejs pour faire du front et j'ai 45 ans";


const a1 = await session.prompt(q1);
console.log("User: " + q1);
console.log("AI: " + a1);


const q2 = "Qui suis-je ?";
console.log("User: " + q2);

const a2 = await session.prompt(q2);
console.log("AI: " + a2);

const chatHistory = session.getChatHistory();

console.log(chatHistory);

//session.dispose();
/*
file:///home/smag/dev/igora/node_modules/lifecycle-utils/dist/DisposeAggregator.js:67
            throw new DisposedError();
                  ^

DisposedError: Object is disposed

*/

const context2 = new LlamaContext({
    model,
    contextSize: Math.min(4096, model.trainContextSize)
});

const session2 = new LlamaChatSession({
    contextSequence: context2.getSequence()
});
session2.setChatHistory(chatHistory);

const q3 = "Quel âge aurais-je dans 4 ans et quel est mon front-end préféré?";
console.log("User: " + q3);

const a3 = await session2.prompt(q3);
console.log("AI: " + a3);

const chatHistory2 = session2.getChatHistory();

console.log(chatHistory2);