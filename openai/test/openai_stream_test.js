import OpenAI from "openai";

//run with `node --env-file=.env openai_stream_test.js `


// const openai = new OpenAI();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_API_BASE,
  });

async function main() {
    const stream = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: "Say this is a test" }],
        stream: true,
    });
    for await (const chunk of stream) {
        process.stdout.write(chunk)
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
}

main();