import {fileURLToPath} from "url";
import path from "path";
import {getLlama, LlamaModel, LlamaContext, LlamaChatSession} from "node-llama-cpp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const llama = await getLlama(
    {gpu: false}
);
const model = new LlamaModel({
    llama,
    //modelPath: path.join(__dirname, "models", "dolphin-2.1-mistral-7b.Q4_K_M.gguf")
    modelPath: path.join(__dirname, "models", "vicuna-7b-v1.5-16k.Q2_K.gguf")
});
const context = new LlamaContext({
    model,
    contextSize: Math.min(4096, model.trainContextSize)
});
const session = new LlamaChatSession({
    contextSequence: context.getSequence()
});


const q1 = "Hi there, how are you?";
console.log("User: " + q1);

const a1 = await session.prompt(q1);
console.log("AI: " + a1);


const q2 = "Summerize what you said";
console.log("User: " + q2);

const a2 = await session.prompt(q2);
console.log("AI: " + a2);

const chatHistory = session.getChatHistory();


//session.dispose();

// session2
const context2 = new LlamaContext({
    model,
    contextSize: Math.min(4096, model.trainContextSize)
});

const session2 = new LlamaChatSession({
    contextSequence: context2.getSequence()
});
session2.setChatHistory(chatHistory);

const q3 = "What was my last request?";
console.log("User: " + q3);

const a3 = await session2.prompt(q3);
console.log("AI: " + a3);