import * as dotenv from 'dotenv';
dotenv.config();
console.log('Loading dotenv file...');
import { Explorer } from "./lib/explorer/index.js";

let options = {    
    name: "Explorer",
    credentials: {
        username: process.env.SOLID_USERNAME,
        password: process.env.SOLID_PASSWORD,
    },
    limit: 100,  // limit by container 0 means no limit
    on_redirect: ["follow", "manual", "error", "auto", "verbose", "silent"], //"manual" exclude "auto"
    on_error: ["exclude", "delete", "remove_from_index","manual", "error", "auto", "verbose", "silent"], //"manual" exclude "auto" // specific by error type
} // default options for this explorer
let explorer = new Explorer(options);

explorer.log("init")

let urls =[
    //"example.com",
    // "https://spoggy-test2.solidcommunity.net",
    // "https://spoggy-test5.solidcommunity.net",
    // "https://spoggy-test5.solidcommunity.net/public",
    // "https://spoggy-test5.solidcommunity.net/private",
    "https://spoggy-test5.solidcommunity.net/public/brains/",
    // "https://spoggy-test5.solidcommunity.net/public/bookmarks/Music/Pink%20Floyd/bookmarks.ttl",
    "https://spoggy-test5.solidcommunity.net/public/Fractopia/v0.2/spaces"
]

let scan_options = { // scan_options can differ for each url and override default explorer options
    urls: urls,
    public: true, // all public resources found even if in private container
    private: false, // need credentials to read
    friends: true,
    exclude: [], 
    search: [],
}
explorer.scan(scan_options)