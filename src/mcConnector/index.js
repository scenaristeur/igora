import { Base } from "../base/index.js";

import { fileURLToPath } from "url";
import path from "path";
import {
  getLlama,
  LlamaModel,
  LlamaContext,
  LlamaChatSession,
 // TemplateChatWrapper,
} from "node-llama-cpp";
// import { get_encoding, encoding_for_model } from "tiktoken";
// const enc = get_encoding("cl100k_base"); // encoding_for_model("gpt-4-0125-preview");

/**
 * The module's entry point.
 * @module mcConnector
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const llama = await getLlama({ gpu: false });
let model = undefined;

/**
 * The list of prompts to be processed.
 * @type {Array}
 */
let prompts = [];

/**
 * The map of sessions, indexed by the channel/user pair.
 * @type {Object}
 */
let sessions = {};

/**
 * The connector class for the Multi-Channel ASSISTANT.
 * Extends the base connector class.
 * @extends Base
 */
export class McConnector extends Base {
  /**
   * Initializes the instance.
   * @param {Object} options - The options as a name/value map.
   */
  constructor(options = {}) {
    super(options);

    /**
     * The name of the LLM model to be used.
     * @type {string}
     */
    this.modelName = options.modelName || "vicuna-7b-v1.5-16k.Q2_K.gguf";

    /**
     * The path to the LLM model.
     * @type {string}
     */
    const modelPath = path.join(process.cwd(), "models", this.modelName);

    /**
     * The message to be printed when the model is loaded.
     * @type {string}
     */
    const modelLoadedMessage = "Loading LLM model from";

    console.log(modelLoadedMessage, modelPath);

    model = new LlamaModel({
      llama,
      modelPath: modelPath,
      // gpuLayers: 64 // or any other number of layers you want for use with gpu
    });

    /**
     * The flag that is added to the output text.
     * @type {string}
     */
    this.flag = "[MULTI-CHANNEL]";

    /**
     * The chalk instance used for coloring the flag.
     * @type {Chalk}
     */
    this.chalk = this.chalk.rgb(145, 167, 45); //.hex('#DEADED')

    this._init();
  }

  /**
   * Initializes the module if needed.
   * @returns {Promise} The promise that resolves when initialized.
   * @private
   */
  async _init() {
    if (this.options.runMcTest == true) {
      await this.test();
    } else {
      this.state = "ready";
    }
  }
  /**
   * Handle a message from the assistant.
   * @param {Object} options - The options for the request.
   * @param {string} options.user - The user making the request.
   * @param {string} options.id - The id of the current request.
   * @param {string} options.prompt - The prompt for the request.
   * @param {string} options.seed - The seed for the generation.
   * @param {number} options.temperature - The temperature for the generation.
   * @param {Function} cb - The callback function.
   * @returns {Promise} - The promise that resolves when the message has been processed.
   */
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

this.log("context",context)

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

}
