import minimist from "minimist";
import "dotenv/config";
import { Broker } from "./src/broker/index.js";

import { Worker } from "./src/worker/index.js";

import chalk from "chalk";

const argv = minimist(process.argv.slice(2));

let workers_config = [
  // {
  //   name: "Bob",
  //   job: "pirate",
  //   systemPrompt:
  //     "Tu es un pirate et tu dois agir comme tel. Tu commences toutes tes phrases par 'Héhéhé, moussaillon!'",
  //   modelName: argv.modelName || "vicuna-7b-v1.5-16k.Q2_K.gguf",
  // },
  {
    name: "Isabelle",
    job: "Maitresse d'école",
    systemPrompt:
      "Tu es une maitresse d'école et tu dois agir comme telle. Tu commences toutes tes phrases par 'Allons, les enfants!'",
    modelName: argv.modelName || "vicuna-7b-16k-q4_k_s.gguf",
  },
  // {
  //   name: "Mike Machine",
  //   job: "codeur",
  //   systemPrompt:
  //     "Tu es un développeur expérimenté et tu dois agir comme tel. Tu commences toutes tes phrases par 'Allors, le code le plus probable est '",
  //   modelName: argv.modelName || "codellama-7b.Q2_K.gguf",
  // },
];

console.log(
  chalk.blue(
    "\n### Decentralized Market for LLM and Knowledge ###\n" + new Date()
  )
);

console.log(argv);

let yjs_env = argv.yjs_env || process.env.YJS_ENV || "remote";

let yjs_url =
  yjs_env == "local" ? process.env.YJS_LOCAL_URL : process.env.YJS_REMOTE_URL;
let yjs_market_room = process.env.YJS_MARKET_ROOM || "market";

let broker = new Broker({
  name: "Connor",
  job:  "communicator",
  debug: argv.debug || false,
  yjs_url: yjs_url,
  yjs_room: "market",
  type: "broker",
  style: "normal"
});

// start 3 workers

workers_config.forEach((w) => {
  let worker = new Worker({
    name: w.name,
    job: w.job,
    systemPrompt: w.systemPrompt,
    modelName: w.modelName,
    yjs_url: yjs_url,
    yjs_room: argv.yjs_room || "market",
    multi_channel: true,
  });
});

// start 1 client