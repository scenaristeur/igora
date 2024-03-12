import { Base } from "../base/index.js";

import { fileURLToPath } from "url";
import path from "path";
import {
  getLlama,
  LlamaModel,
  LlamaContext,
  LlamaChatSession,
  TemplateChatWrapper,
} from "node-llama-cpp";
// import { get_encoding, encoding_for_model } from "tiktoken";
// const enc = get_encoding("cl100k_base"); // encoding_for_model("gpt-4-0125-preview");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const llama = await getLlama({ gpu: false });
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
      llama,
      modelPath: modelPath,
      // gpuLayers: 64 // or any other number of layers you want for use with gpu
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
  }

  chat = async (options, cb) => {
    const that = this;
    console.log(options);
    let history = options.messages.map((m) => {
      let message = {};
      if (m.role == "assistant") {
        message = {
          type: "model",
          response: [m.content],
        };
      } else {
        //message.id = m.id;
        message.type = m.role;
        message.text = m.content;
      }
      return message;
    });

    let seed =
      options.seed != 0 ? options.seed : Math.floor(Math.random() * 100) + 1;
    this.log("### " + options.user + " say " + options.prompt, "seed:", seed);
    this.log("### starting session n°" + options.id);

    const context = new LlamaContext({
      model,
      seed,
      contextSize: Math.min(4096, model.trainContextSize),
    });

    const session = new LlamaChatSession({
      contextSequence: context.getSequence(),
    });

    session.setChatHistory(history);

    let s = {
      options: options,
      //context: context,
      modelName: that.modelName,
      session: session,
      start: Date.now(),
      response: "",
    };
    console.log("history",history)

    sessions[options.id] = s;
    this.log("### sessions actives ", sessions);
    const chat = await session.prompt(options.prompt, {
      // Temperature et autres prompt options https://withcatai.github.io/node-llama-cpp/guide/chat-session#custom-temperature
      temperature: options.temperature || 0.7,
      // maxTokens: maxTokens,
      onToken(chunk) {
        const tok = model.detokenize(chunk); // context.decode(chunk); https://github.com/withcatai/node-llama-cpp/pull/105#issuecomment-1944189912
        that.log(
          Object.keys(sessions).length + "sessions- " + options.id + " : " + tok
        );
        cb(tok);
        s.response += tok;
      },
    });

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

  chat1 = async (options, cb) => {
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
    // const context = new LlamaContext({ model, seed });
    const context = new LlamaContext({
      model,
      seed,
      contextSize: Math.min(4096, model.trainContextSize),
    });

    // let tokens = enc.encode(JSON.stringify(options.conversationHistory))
    // let tokens = context.encode(JSON.stringify(options.conversationHistory));
    // console.log("TIKTOKEN length", tokens, tokens.length);

    // while (tokens.length > 300) {
    //   console.log("token too long", tokens);
    //   // keep system_prompt
    //   // let system_message = options.conversationHistory.pop()
    //   // remove the older message
    //   let removed = options.conversationHistory.shift();
    //   console.log("removed", removed);
    //   // add the system message
    //   // options.conversationHistory.unshift(system_message)
    //   tokens = context.encode(JSON.stringify(options.conversationHistory));
    //   console.log("TIKTOKEN length", tokens, tokens.length);
    // }
    const chatWrapper = new TemplateChatWrapper({
      template: "{{systemPrompt}}\n{{history}}model:{{completion}}\nuser:",
      historyTemplate: "{{roleName}}: {{message}}\n",
      modelRoleName: "assistant",
      userRoleName: "user",
      systemRoleName: "system", // optional
      // functionCallMessageTemplate: [ // optional
      //     "[[call: {{functionName}}({{functionParams}})]]",
      //     " [[result: {{functionCallResult}}]]"
      // ]
    });

    let sessionOptions = {
      // context: context,
      contextSequence: context.getSequence(),
      chatWrapper,
      // conversationHistory: options.conversationHistory || [],
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

    // setChatHistory is not defined https://github.com/nathanlesage/local-chat/issues/5
    //s.setChatHistory(options.conversationHistory)
    sessions[options.id] = s;

    this.log("### sessions actives ", sessions);
    // let maxTokens = context.getContextSize();
    // console.log("MAXTOKENS", maxTokens);

    const chat = await session.prompt(options.prompt, {
      // Temperature et autres prompt options https://withcatai.github.io/node-llama-cpp/guide/chat-session#custom-temperature
      temperature: options.temperature || 0.7,
      // maxTokens: maxTokens,
      onToken(chunk) {
        const tok = model.detokenize(chunk); // context.decode(chunk); https://github.com/withcatai/node-llama-cpp/pull/105#issuecomment-1944189912
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
