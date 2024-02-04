import minimist from "minimist";
import { Broker } from "./src/broker/index.js";


const argv = minimist(process.argv.slice(2));

console.log("\n### Decentralized Market for LLM and Knowledge ###\n" + new Date());
console.log(argv);


let worker = new Broker({
    name: argv.name || "Bob",
    job: argv.job || "unemployed",
    debug: argv.debug,
    color: argv.color
});