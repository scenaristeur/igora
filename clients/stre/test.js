// const { Readable } = require('stream');
// const { openai } = require('@openai/api');
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "truc", //process.env['OPENAI_API_KEY'], // This is the default and can be omitted
  baseURL: 'http://127.0.0.1:5678/v1',
});


async function main() {
  const stream = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Say this is a test' }],
    stream: true,
  });
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();

// If you need to cancel a stream, you can break from the loop or call stream.controller.abort().