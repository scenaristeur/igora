import { Base } from "../base/index.js";

import { fileURLToPath } from "url";
import path from "path";
import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let model = undefined;

let prompts = [];
let sessions = {};

export class McConnector extends Base {
  constructor(options = {}) {
    super(options);
    this.modelName = options.modelName || "vicuna-7b-v1.5-16k.Q2_K.gguf";

    const modelPath = path.join(process.cwd(), "models", this.modelName);
    console.log("Loading LLM model from", modelPath);

    model = new LlamaModel({
      modelPath: modelPath,
    });
    this.flag = "[MULTI-CHANNEL]";
    this.chalk = this.chalk.rgb(145, 167, 45); //.hex('#DEADED')

    this._init();
  }
  async _init() {
    if (this.options.runMcTest == true) {
      await this.test();
    } else {
      this.state = "ready";
    }

    // this.catai = new RemoteCatAI(this.options.catai_url);
    // this.catai.on("open", async () => {
    //   this.log("Connected to ", this.options.catai_url);
    //   if (this.options.debug) {
    //     await this.test();
    //   }
    // });

    // this.catai.on("close", async () => {
    //   this.log("CATAI close");
    //   this.state = "ws closed";
    //   this.log("state", this.state);
    // });

    // this.catai.on("error", async (err) => {
    //   this.log("CATAI error", err);
    //   this.state = "ws error";
    //   this.log("state", this.state);
    //   // relance de la connexion après un délai ?
    // });
  }
  async test() {
    this.log("test if MultiChannel is ok");

    let alice_prompt = {
      id: "1",
      user: "Alice",
      prompt: "Quelle est la capitale de la France ?",
      systemPrompt:
        "Tu es un pirate et tu dois agir comme tel. tu termines toutes tes phrases par 'Hé! Hé! Hé!'",
      temperature: 0.8,
    };

    let bob_prompt = {
      id: "2",
      user: "Bob",
      prompt: "Raconte-moi une blague au sujet d'une rose.",
      systemPrompt:
        "Tu es un pirate et tu dois agir comme tel. tu termines toutes tes phrases par 'Hé! Hé! Hé!'",
      temperature: 0.8,
      //prompt: "C'est qui la physique quantique ?",
    };

    let carlo_prompt = {
      id: "3",
      user: "Carlo",
      prompt: "Toc Toc Toc, qui est là ? ",
      systemPrompt:
        "Tu es un pirate et tu dois agir comme tel. tu termines toutes tes phrases par 'Hé! Hé! Hé!'",
      temperature: 0.8,
    };

    let denise_prompt = {
      id: "4",
      user: "Denise",
      prompt: "Toc Toc Toc, qui est là ? ",
      systemPrompt:
        "Tu es un pirate et tu dois agir comme tel. tu termines toutes tes phrases par 'Hé! Hé! Hé!'",
      temperature: 0.2,
    };

    //prompts.push(alice_prompt)
    //prompts.push(bob_prompt)
    //prompts.push(carlo_prompt)
    prompts.push(denise_prompt);

    // lancer en parallèle les chats
    for (let p of prompts) {
      console.log("\nP", p);
      let chatsession = this.chat(p, this.callback);
    }

    //   this.log("Connected, sending 'Are you ready?' to catai...");
    //   const response = await this.catai.prompt(
    //     "Hello Catai, are you ready ?",
    //     (token) => {
    //       process.stdout.write(token);
    //     }
    //   );

    //   this.log(`[TEST] Total text length: ${response.length}`);
    //   this.state =
    //     response.length > 0
    //       ? "ready"
    //       : "no response, did you launch catai ? see https://github.com/withcatai/catai";
    //   this.log("state", this.state);
  }

  chat = async (options, cb) => {
    const that = this;

    if (options.prompt == undefined) {
      console.log(options.messages);
      let messages = options.messages;
      let system_message =
        messages[0].role == "system" ? messages.shift() : undefined;
      let user_last_message = messages.pop();
      console.log("USER MESSAGE", user_last_message);
      console.log("SYSTEM MESSAGE", system_message);
      console.log("messages", messages);
      options.prompt = user_last_message.content;
      let conversationHistory = [];
      while (messages.length > 0) {
        let user_message = messages.shift();
        let assistant_message = messages.shift();
        console.log(user_message, assistant_message);
        if (user_message && assistant_message) {
          conversationHistory.push({
            prompt: user_message.content,
            response: assistant_message.content,
          });
        }
      }
      options.conversationHistory = conversationHistory;
      // options.conversationHistory = [
      //   {
      //     prompt: "Hi there!",
      //     response: "Hello!",
      //   },
      //   {
      //     prompt: "How are you?",
      //     response: "I'm good, how are you?",
      //   },
      // ];
      //messages
      options.systemPrompt = system_message.content;
    }

    let seed =
      options.seed != 0 ? options.seed : Math.floor(Math.random() * 100) + 1;
    this.log("### " + options.user + " say " + options.prompt, "seed:", seed);
    this.log("### starting session n°" + options.id);
    const context = new LlamaContext({ model, seed });

    let sessionOptions = {
      context: context,
      conversationHistory: options.conversationHistory || [],
    };

    // https://github.com/withcatai/node-llama-cpp/blob/c0f5bd8/src/llamaEvaluator/LlamaChatSession.ts#L180
    if (options.systemPrompt != undefined)
      sessionOptions.systemPrompt = options.systemPrompt;

    console.log("sessionOptions", sessionOptions);

    const session = new LlamaChatSession(sessionOptions);
    let s = {
      options: options,
      //context: context,
      modelName: that.modelName,
      session: session,
      start: Date.now(),
      response: "",
    };

    sessions[options.id] = s;

    this.log("### sessions actives ", sessions);
    let maxTokens = context.getContextSize()
    console.log('MAXTOKENS', maxTokens)

    const chat = await session.prompt(options.prompt, {
      // Temperature et autres prompt options https://withcatai.github.io/node-llama-cpp/guide/chat-session#custom-temperature
      temperature: options.temperature || 0.7,
      maxTokens: maxTokens,
      onToken(chunk) {
        const tok = context.decode(chunk);
        that.log(
          Object.keys(sessions).length + "sessions- " + options.id + " : " + tok
        );
        cb(tok);
        s.response += tok;
      },
    });
    // should i close session ?  session.close()
    s.end = Date.now();
    s.duration = s.end - s.start;
    this.log("!!! session terminée n°" + options.id + " : " + s.response, s);

    this.log(`[TEST] Total text length: ${s.response.length}`);
    this.state =
      s.response.length > 0
        ? "ready"
        : "no response, error with multiChannelConnector, did you download a model ?";
    this.log("state", this.state);

    this.estimationTime = s.duration;

    delete sessions[options.id];
    this.log("estimation time : ", this.estimationTime);
    console.log("!!! sessions actives ", sessions.toString());
  };

  callback = (text) => {
    this.log(text);
    // with websocket should be emit to socket
  };
}
