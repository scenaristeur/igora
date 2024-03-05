import cp from "child_process";
import * as fs from "fs";
import "dotenv/config";
import { downloadFile } from "ipull";

console.log(downloadFile);

// cp .env-example to .env
if (fs.existsSync(".env")) {
  console.info(".env already exists");
} else {
  console.info("copy .env-example to .env");
  cp.exec("cp .env-example .env", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

// Download dolphin model
const MODEL_NAME =
  process.env.MODEL_NAME || "dolphin-2.2.1-mistral-7b.Q2_K.gguf";
const MODEL_PATH = "./models";
const MODEL_FILE = `./models/${MODEL_NAME}`;
const MODEL_SOURCE = `https://huggingface.co/TheBloke/dolphin-2.2.1-mistral-7B-GGUF/resolve/main/dolphin-2.2.1-mistral-7b.Q2_K.gguf`;

if (fs.existsSync(MODEL_FILE)) {
  console.info(MODEL_FILE, " already exists");
} else {
  console.info(
    `!!!!!   YOU SHOULD DOWNLOAD A MODEL WITH 

            npx ipull -s ./models https://huggingface.co/TheBloke/dolphin-2.2.1-mistral-7B-GGUF/resolve/main/dolphin-2.2.1-mistral-7b.Q2_K.gguf

    !!!!! AND ADJUST YOUR .env file with the DOWNLOADED MODEL`
  );

  //       const download = "npx ipull -s ./models https://huggingface.co/TheBloke/dolphin-2.2.1-mistral-7B-GGUF/resolve/main/dolphin-2.2.1-mistral-7b.Q2_K.gguf"
  //       cp.exec(download, (error, stdout, stderr) => {
  //     if (error) {
  //       console.error(`exec error: ${error}`);
  //       return;
  //     }
  //     console.log(`stdout: ${stdout}`);

  //   });

  //   const downloader = downloadFile(MODEL_SOURCE, {
  //       directory: MODEL_PATH,
  //       //fileName: 'file.large', // optional
  //       cliProgress: true // Show progress bar in the CLI (default: true)
  //   });

  //   await downloader.download();
}

// // npm install
// cp.exec("npm install", (error, stdout, stderr) => {
//     if (error) {
//       console.error(`exec error: ${error}`);
//       return;
//     }
//     console.log(`stdout: ${stdout}`);

//   });

  // fixing websocket
cp.exec("npm run fix", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);

  });


  cp.exec("cd && PORT=1234 npx y-websocket",  { stdio: "ignore", detached: true }, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
})

// start Igora worker
  cp.exec("npm run start", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);

  });
