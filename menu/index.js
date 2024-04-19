import { input, checkbox, Separator } from '@inquirer/prompts';



const services = await checkbox({
    message: 'Select a package manager',
    choices: [
        new Separator("-- Serveurs d'inférence LLM --"),
        { name: 'node-llama-cpp', value: 's_nlc' },
        { name: 'llama-cpp-python', value: 's_lcp' },
        new Separator("-- Modèles --"),
        { name: 'dolphin', value: 'm_dolphin' },
        { name: 'llama', value: 'm_llama' },
        { name: 'hermes', value: 'm_hermes' },
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
