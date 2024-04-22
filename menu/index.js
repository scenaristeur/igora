import { input, checkbox, Separator } from '@inquirer/prompts';



const services = await checkbox({
    theme: {
        prefix: `Mise en place de la configuration d'IGORA
.------.------.    
+-------------+                     ___        |      |      |    
|             |                     \ /]       |      |      |    
|             |        _           _(_)        |      |      |    
|             |     ___))         [  | \___    |      |      |    
|             |     ) //o          | |     \   |      |      |    
|             |  _ (_    >         | |      ]  |      |      |    
|          __ | (O)  \__<          | | ____/   '------'------'    
|         /  o| [/] /   \)        [__|/_                          
|             | [\]|  ( \         __/___\_____                    
|             | [/]|   \ \__  ___|            |                   
|             | [\]|    \___E/%%/|____________|_____              
|             | [/]|=====__   (_____________________)             
|             | [\] \_____ \    |                  |              
|             | [/========\ |   |                  |              
|             | [\]     []| |   |                  |              
|             | [/]     []| |_  |                  |              
|             | [\]     []|___) |                  |    MEPH          
===================================================================


`
    },
    message: 'Selectionnez les services et les modèles que vous souhaitez lancer.\n',
    choices: [
        new Separator("\n\n-- Serveurs d'inférence LLM --"),
        { name: 'node-llama-cpp', value: 's_nlc' },
        { name: 'llama-cpp-python', value: 's_lcp' },
        new Separator("-- Modèles --"),
        { name: 'dolphin', value: 'm_dolphin' },
        { name: 'llama', value: 'm_llama' },
        { name: 'hermes', value: 'm_hermes' },
        new Separator("-- Autres services et outils --"),
        { name: 'bigAgi chat interface', value: 't_bigagi' },
        { name: 'Serveur Compatible OpenAi', value: 't_openai_compatible' },
        { name: 'Stockage History', value: 't_stockage_history' },
        { name: 'Authentification', value: 't_auth' },
        // { name: 'pnpm', value: 'pnpm', disabled: true },
        // {
        //     name: 'pnpm',
        //     value: 'pnpm',
        //     disabled: '(pnpm is not available)',
        // },
    ],
});

console.log(services)


const config_name = await input({ message: 'Nom de cette config' });
console.log(config_name)


launch_services(services)

function launch_services(arr) {
    arr.forEach(function(value, index) {
      switch (value) {
        case 's_nlc':
          console.log('This is s_nlc lancement node llama cpp');
          break;
        case 's_lcp':
          console.log('Lancement serveur python');
          node 
          break;
        case 'third':
          console.log('This is third');
          break;
        case 'fourth':
          console.log('This is fourth');
          break;
        default:
          console.log('None');
      }
    });
  
  }
