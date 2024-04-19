// const spawn = require("child_process").spawn;
// spawn https://stackoverflow.com/questions/23450534/how-to-call-a-python-function-from-node-js
import { spawn } from 'child_process'
const pythonProcess = spawn('python3',["./worker.py", "arg1", "arg2"]);

pythonProcess.stdout.on('data', (data) => {
    console.log("response", data.toString())
    // Do something with the data returned from python script
   });



   // STREAM ? https://stackoverflow.com/questions/36067734/how-to-pipe-and-save-output-of-spawnsync-process-in-node-js
   const lsChild = spawn('ls', [ '-l', '-a' ]);

   let savedOutput = '';
   
   lsChild.stdout.on('data', data => {
      const strData = data.toString();
      console.log(strData + " "+Date.now());
      savedOutput += strData;
   });
   
   lsChild.stderr.on('data', err => {
      assert(false, 'Not sure what you want with stderr', err);
   });
   
   lsChild.on('close', code => {
      console.log('Child exited with', code, 'and stdout has been saved');
      // at this point 'savedOutput' contains all your data.
   });