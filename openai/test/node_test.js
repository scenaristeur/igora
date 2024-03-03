// const axios = require("axios").default;
import axios from 'axios';

const body1 = {
  messages: [
    {
      role: "system",
      content: "Tu es un pirate et commence toutes tes phrases par 'Héhé... '.",
    },
    { role: "user", content: "Quelle est la capitale de la France?" },
  ],
  max_tokens: 800,
  min_tokens: 10,
  stop: [
    //"\n", 
    "###",

],
};

const body = {
    messages: [
      {
        role: "system",
        content: `Agis comme un écrivain. Développez le texte de l'utilisateur en ajoutant plus de détails tout en gardant le même sens.
         Donne uniquement le texte et rien d'autre, 
         ne discute pas, pas de préambule, va à l'essentiel.`,
      },
      { role: "user", content: "Julie est une artiste qui dessine, elle est assise à la terrasse d'un café et griffone son calepin. " },
    ],
    max_tokens: 800,
     stop: [
      //"\n", 
      "###",
  
  ],
  };

axios
  .post(
    `http://127.0.0.1:5678/v1/chat/completions`,
    body
    // {
    //     "prompt": "\n\n### Instructions:\nWhat is the capital of France?\n\n### Response:\n",
    //     "stop": [
    //       "\n",
    //       "###"
    //     ]
    //   }
  )
  .then(function (response) {
    console.log(response.data.choices[0].message);
  })
  .catch(function (error) {
    console.log(error);
  });

//requestUrl({
//     method: "POST",
//     url: `http://127.0.0.1:5678/v1/chat/completions`, ///api/generate`,

//     body: JSON.stringify({

//         "prompt": "\n\n### Instructions:\nWhat is the capital of France?\n\n### Response:\n",
//         "stop": [
//           "\n",
//           "###"
//         ]

//       // prompt: prompt,
//       // model: command.model || this.settings.defaultModel,
//       // options: {
//       //   temperature: command.temperature || 0.2,
//       // },
//     }),
//   })
//     .then((response) => {
//       console.log("response", response)
//       let text = response.json.choices[0].message.content

//       console.log("text", text)

//     })
//     .catch((error) => {
//       console.log("error", error)
//     })
