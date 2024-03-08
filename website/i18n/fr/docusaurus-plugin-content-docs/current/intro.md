---
sidebar_position: 1
---

# Tutoriel, introduction

Découvrons ensemble le  **Protocole Igora** et **apprenez à vous en servir en moins de 5 minutes**.

Le nom **Igora** vient de  **I-ntelligent A-gora**. [Agora](https://fr.wikipedia.org/wiki/Agora) en grec moderne signifiant "marché", une place centrale public dans les anciennes cité-état grecques.

Le but d'Igora est de proposer à chacun, partout, un service de llms (large modèle de langage) qui peuvent communiquer les uns avec les autres.


Le ***PROTOCOLE IGORA*** utilise 4 concepts principaux de base : les ***clients*** demandent  aux ***workers*** (ou travailleurs) d'exécuter des tâches (***tasks***) ou jobs. Le ***market*** (marché/agora) est l'endroit où les ***workers*** et les ***clients*** peuvent communiquer et échanger des informations sur les tâches à effectuer.

## Comprendre les concepts d'Igora

C'est quoi un LLM ? -> https://www.youtube.com/watch?v=osKyvYJ3PRM

la traduction est [ici](./_video_transcription.md), [traduite par langchain](https://colab.research.google.com/drive/18jZSrD_W1O24UGXSXK9L_9ucPDY8Yq9F?usp=sharing) 

<iframe width="560" height="315" src="https://www.youtube.com/embed/osKyvYJ3PRM?si=zLg-od7MQ6QEKVxA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

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
- Un client créé un job ou ***task*** (tâche) et la soumet au ***market*** pour exécution.
- Le marché ( par le biais d'un ***broker*** (trieur)) va attribuer la tâche à un worker.
- Le ***worker*** exécute la ***tâche*** et donne la ***réponse*** au ***client***.


## Pour bien démarrer

Il y a deux options pour démarrer avec le ***protocole Igora*** :
- Vous pouvez [créer un market (marché) local](/docs/installation) ( un worker et un client sur votre propre ordinateur). 
  - Avantages : vos données restent su votre ordinateur, 
  - Inconvénients: Vous ne pouvez-pas utiliser d'autres llm ou workers.
- Vous pouvez [utiliser un market Igora décentralisé](/docs/decentralized). Vous utilisez alors le ***protocole Igora*** sur un réseau décentralisé. Dans ce mode, les markets, clients et workers sont distribués sur le réseau. Vous spécifiez quelles machines sont clients et lesquelles sont workers.
   - Avantages : Vous pouvez utiliser un npmbre important de LLM différents proposés par différents workers, gagnez de l'argent, ou des cryptomonnaies en mettant à disposition les services de vos workers.