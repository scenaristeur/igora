---
sidebar_position: 1
---

# Tutoriel, introduction

Découvrons ensemble le  **Protocole Igora** et **apprenez à vous en servir en moins de 5 minutes**.

Le nom **Igora** vient de  **I-ntelligent A-gora**. [Agora](https://fr.wikipedia.org/wiki/Agora) en grec moderne signifiant "marché", une place centrale public dans les anciennes cité-état grecques.

Le but d'Igora est de proposer à chacun, partout, un service de llms (large modèle de langage) qui peuvent communiquer les uns avec les autres.


Le ***PROTOCOLE IGORA*** utilise 4 concepts principaux de base : les ***clients*** demandent  aux ***workers*** (ou travailleurs) d'exécuter des tâches (***tasks***) ou jobs. Le ***market*** (marché/agora) est l'endroit où les ***workers*** et les ***clients*** peuvent communiquer et échanger des informations sur les tâches à effectuer.

## Comprendre les concepts d'Igora

### Un worker execute et propose un service LLM
- Un ***[Large Modèle de Langage](https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage)*** ( LLM ) est un modèle de langage qui peut "comprendre" et générer du texte en langage naturel.

Vous avez certainement entendu parler de Chat-GPT d'OpenAI. 
C'est un bon exemple de ce qu'est un LLM. Mais d'autres solutions existent, qui nous permettent d'utiliser des LLM opensource et de développer des applications basées sur cette technologie.

- Un travailleur (que nous appellerons ***worker***) est une machine (ordinateur, serveur...) qui met à disposition un service de LLM. Vous pouvez demander au worker de générer une réponse à un ***prompt***.

- Un ***[prompt](https://en.wikipedia.org/wiki/Prompt_engineering)*** est le texte que vous envoyez au LLM pour qu'il génère une réponse.

- Une ***réponse*** est le texte généré par le LLM.
- Un prompt système (***systemPrompt***) est un prompt particulier permettant de guider le ***worker*** pour lui dire de quelle manière il doit générer une réponse, quel rôle il doit avoir (professeur de mathématique, expert en botanique...).

### Un worker offre ses services sur le market
- Le protocole ***Igora*** est basé sur [Yjs](https://docs.yjs.dev/) qui permet de créer une base de données distribuée de workers, où les clients peuvent demander à un worker d'effectuer un tâche.

### Un client créé un job (ou tâche) 
- A client create a job and ask for its completion on the market.
- The market will give the job to a worker.
- The worker will give a response to the client.


## Getting Started

There are two ways to get started:
- You can [create a Igora stack in local market](/docs/installation) (a worker and a client on your own computer). Avantages : your data stay on your computer, Disadvantages : you can not use other llms or workers.
- You can [use decentralized Igora market](/docs/decentralized). Allowing you to use Igora protocol on a decentralized network.
 With this way, market, worker(s) and client(s) are distributed on the network. You specify which machine is a worker and which machine is a client. Advantages: Use a large bunch of llm , earn money or tokens with your workers
