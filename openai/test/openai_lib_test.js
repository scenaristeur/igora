// https://platform.openai.com/docs/libraries/typescript-javascript-library

// run with `node --env-file=.env openai_lib_test.js`

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE,
});

const chatCompletion = await openai.chat.completions.create({
  messages: [{ role: "user", content: "Raconte-moi une blague" }],
  model: "gpt-3.5-turbo",
});


console.log(chatCompletion.choices[0].message)

// stream = client.chat.completions.create(
//     model="gpt-4",
//     messages=[{"role": "user", "content": "Say this is a test"}],
//     stream=True,
// )
// for chunk in stream:
//     if chunk.choices[0].delta.content is not None:
//         print(chunk.choices[0].delta.content, end="")