let myWindowId;
const contentBox = document.querySelector("#content");
const resumer_btn = document.getElementById("resumer")
const en_fr_btn = document.getElementById("en_fr")

console.log("hello")
/*
Make the content box editable as soon as the user mouses over the sidebar.
*/
window.addEventListener("mouseover", () => {
  contentBox.setAttribute("contenteditable", true);
});

/*
When the user mouses out, save the current contents of the box.
*/
window.addEventListener("mouseout", () => {
  contentBox.setAttribute("contenteditable", false);
  browser.tabs.query({ windowId: myWindowId, active: true }).then((tabs) => {
    let contentToStore = {};
    contentToStore[tabs[0].url] = contentBox.textContent;
    browser.storage.local.set(contentToStore);
  });
});

/*
Update the sidebar's content.

1) Get the active tab in this sidebar's window.
2) Get its stored content.
3) Put it in the content box.
*/
function updateContent() {
  browser.tabs.query({ windowId: myWindowId, active: true })
    .then((tabs) => {
      return browser.storage.local.get(tabs[0].url);
    })
    .then((storedInfo) => {
      contentBox.textContent = storedInfo[Object.keys(storedInfo)[0]];
    });
}

/*
Update content when a new tab becomes active.
*/
browser.tabs.onActivated.addListener(updateContent);

/*
Update content when a new page is loaded into a tab.
*/
browser.tabs.onUpdated.addListener(updateContent);

/*
When the sidebar loads, get the ID of its window,
and update its content.
*/
browser.windows.getCurrent({ populate: true }).then((windowInfo) => {
  myWindowId = windowInfo.id;
  updateContent();
});


// LLM

const system_prompts = {
  "resumer": `Agir comme un écrivain. Résumez le texte dans une vue en phrases mettant en évidence les points clés à retenir.`,
  "expliquer": `Agir comme un écrivain. Expliquez le texte en termes simples et concis en gardant le même sens.`,
  "etendre": `Agir comme un écrivain. Développez le texte en ajoutant plus de détails tout en gardant le même sens.`,
  "formel": `Agir comme un écrivain. Réécrire le texte dans un style plus formel tout en gardant le même sens.`,
  "courant": `Agir comme un écrivain. Réécrire le texte dans un style plus décontracté tout en gardant le même sens.`,
  "active": `Agir comme un écrivain. Réécrire le texte avec une voix active tout en gardant le même sens.`,
  "liste": `Agir comme un écrivain. Réécrire le texte sous forme de puces tout en gardant le même sens.`,
  "titre": `Agir comme un écrivain.
  Créez un seul titre pour l'ensemble du texte qui donne une bonne compréhension de ce à quoi le lecteur peut s'attendre.
  Le format de ta réponse doit être ## Légende.`,
  "en_fr": `Traduis le texte d'anglais à français.`,
  "fr_en": `Traduis le texte de français à anglais.`,
}


// async function requete(system_prompt, texte) {
//   const serveur_url = document.getElementById("serveur_url").value
//   const modele = document.getElementById("modele").value

//   let payload = {
//     "messages": [
//       { "role": "system", "content": system_prompt },
//       { "role": "user", "content": texte }
//     ],
//     "model": modele,
//     stream: false,
//     "temperature": 0,
//     "max_tokens": 800,
//     "stop": ["###"]
//   }
// const API_KEY="hello"
// // const stream = false
// // const signal = "one"
// //   const body = {
// //     messages: [], //messages,
// //     model: "dolphin-2.2.1-mistral-7b.Q2_K.gguf",
// //     temperature: 0, //0.7,
// //     stream: stream,
// //     max_tokens: 800,
// //     stop: [
// //       //"\n",
// //       "###",
// //     ],
// //   };

//   const url = serveur_url + "/v1/chat/completions"
//   // const body = 
//   const response = await fetch(url, {
//     method: "POST",
//     mode: 'no-cors',
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//      // Authorization: `Bearer ${API_KEY}`,
//     },
//     body: JSON.stringify(payload),
//    // signal,
//   });
//   console.log("response", response)
//   return response



// }

async function call_llm(e) {
  const action = e.target.id
  const prompt = system_prompts[action]+" Donne uniquement le texte et rien d'autre, ne discute pas, pas de préambule, va à l'essentiel."
  const texte = contentBox.textContent
  console.log(action, prompt, texte)
  //let result = await requete(prompt, texte)
  //console.log("result", result)
  await sendChatCompletion(prompt, texte)
}



async function sendChatCompletion(system_prompt, texte) {
  const serveur_url = document.getElementById("serveur_url").value
  const modele = document.getElementById("modele").value
  const API_URL = serveur_url + "/v1/chat/completions"
  //const API_URL = "http://127.0.0.1:5678/v1/models"
  const API_KEY="sk-xxx"
  // stopBtn.disabled = false;
  // generateBtn.disabled = true;
  // state.innerHTML = "Generating...";
let messages =  []
  controller = new AbortController();
  const { signal } = controller;

  const stream = true//document.getElementById("stream").checked;
  let body = {
    "messages": [
      { "role": "system", "content": system_prompt },
      { "role": "user", "content": texte }
    ],
    //"model": modele,
    "stream": stream,
    "temperature": 0,
    "max_tokens": 800,
    "stop": ["###"]
  }

  console.log("BODY",body);
  // messages.push({ role: "user", content: texte });
  // // list = document.getElementById("list");
  // // let ligne = document.createElement("li");
  // // list.appendChild(ligne);
  // // ligne.innerHTML = "<b>User :</b> " + message;
  // let assistant_message = "";
  // const body = {
  //   messages: messages,
  //   model: "dolphin-2.2.1-mistral-7b.Q2_K.gguf",
  //   temperature: 0, //0.7,
  //   stream: stream,
  //   max_tokens: 800,
  //   stop: [
  //     //"\n",
  //     "###",
  //   ],
  // };

  // try {
    const response = await fetch(API_URL, {
     method: "POST",
     mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Access-Control-Allow-Origin': "*",
        //Authorization: `Bearer ${API_KEY}`,
        //"User-Agent": "truc"
      },
     body: JSON.stringify(body),
      signal,
    });

    if (stream == true) {
      // console.log("response", response, response.blob())

      // https://www.youtube.com/watch?v=wDtjBb4ZJwA
      const reader = response.body.getReader();
      // list = document.getElementById("list");
      // let ligne = document.createElement("li");
      // list.appendChild(ligne);
      // ligne.innerHTML = "<b>Assistant :</b> ";
      let assistant_message = "";

      while (true) {
        const chunk = await reader.read();
        const { done, value } = chunk;
        if (done) {
          console.log("done");
          break;
        }

        const decoder = new TextDecoder("utf-8");
        const decodedChunk = decoder.decode(value);
        const lines = decodedChunk.split("\n");
        const parsedLines = lines
          .map((line) => line.replace(/^data: /, "").trim())
          .filter((line) => line != "" && line !== "[DONE]")
          .map((line) => JSON.parse(line));

        for (const parsedLine of parsedLines) {
          const { choices } = parsedLine;
          const { delta } = choices[0];
          const { content } = delta;
          if (content && content != "{}") {
            console.log(content)
            // ligne.innerHTML += content;
             assistant_message += content;
            const m = { role: "assistant", content: content };
            let message = {
              role: m.role,
              content: m.content,
            };
            messages.push(message);
            console.log("messages", messages);
            // list = document.getElementById("list");
            // list.innerHTML = "";
            // messages.forEach((message) => {
            //   list.innerHTML += `<li><b>${message.role} :</b> ${message.content}</li>`;
            // });
          }
        }
      }
      // messages.push({ role: "assistant", content: assistant_message });
      console.log("messages", messages);
      // state.innerHTML = "";
    } else {
      // console.log("response", response, await response.blob())
      const r = await response.json();
      console.log(r);

      let m = r.choices[0].message;
      let message = {
        role: m.role,
        content: m.content,
      };
      messages.push(message);
      console.log("messages", messages);
      // list = document.getElementById("list");
      // list.innerHTML = "";
      // messages.forEach((message) => {
      //   list.innerHTML += `<li><b>${message.role} :</b> ${message.content}</li>`;
      // });
    }
  // } catch (error) {
  //   if (signal.aborted) {
  //     state.innerHTML = 
  //     console.log("Request aborted"); // "Request aborted.";
  //   } else {
  //     // state.innerHTML = "Error occurred while generating.";
  //     console.log(error);
  //   }
  // } finally {
  //   // stopBtn.disabled = true;
  //   // generateBtn.disabled = false;
  //   // controller = null;
  //   console.log("finally");
  // }
 
}




resumer_btn.addEventListener("click", call_llm)
en_fr_btn.addEventListener("click", call_llm)