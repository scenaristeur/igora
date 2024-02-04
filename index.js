import minimist from "minimist";
import "dotenv/config";
import { Broker } from "./src/broker/index.js";
import { YjsConnector } from "./src/yjsConnector/index.js";

import chalk from "chalk";

const argv = minimist(process.argv.slice(2));

console.log(
  chalk.blue(
    "\n### Decentralized Market for LLM and Knowledge ###\n" + new Date()
  )
);

console.log(argv);

let yjs_env = argv.yjs_env || process.env.YJS_ENV || "remote";

let yjs_url = yjs_env == "local" ? process.env.YJS_LOCAL_URL : process.env.YJS_REMOTE_URL;
let yjs_room = process.env.YJS_MARKET_ROOM || "market";



let marketCommunicator = new YjsConnector({
    name: argv.name || "Connor",
    job: argv.job || "communicator",
    //debug: argv.debug || false,
    // color: argv.color || null,
    // yjs_url: argv.yjs_url || process.env.YJS_URL || "ws://localhost:1234",
    // yjs_room: argv.yjs_room || process.env.YJS_MARKET_ROOM || "market",
    yjs_url: yjs_url,
    yjs_room: yjs_room,
  });
  
  //communicator.check();

let broker = new Broker({
  name: argv.name || "Bob",
  job: argv.job || "unemployed",
  debug: argv.debug || false,
  communicator: marketCommunicator,
  // color: argv.color || null,
});



// start 2 workers




// start 1 client

