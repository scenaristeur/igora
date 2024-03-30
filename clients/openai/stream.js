import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "My API Key",
  baseURL: "http://127.0.0.1:5678/v1",
});

async function main() {
  const stream = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: "Say this is a test" }],
    stream: true,
  });


console.log(stream)
console.log(stream.iterator)


  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }
}

main();
