# Architecture générale Igora
- https://github.com/scenaristeur/igora
```mermaid

graph LR;
    Appli_1--> Igora[Igora \n endpoint];
    Appli_2--> Igora;

   LibreOffice(LibreOffice)--> Igora;
    Firefox(Firefox extension) --> Igora;
    ChatApp(Chat Apps\n- BigAgi)--> Igora;
    Appli_3--> Igora;
    Appli_4--> Igora;
    etc[... autres applis métier]--> Igora;
    Igora --> Middlewares[Igora \n Middlewares];
    Middlewares --> LLMs(Customized LLMs)
    LLMs --> Local(Local LLMs\n- node-llama-cpp\n- llama-cpp-python)
    LLMs --> Decentralized(Decentralized LLMs\n- Petals, private IPFS swarm\n- Custom Solutions)
    LLMs --> bigAI[Bigs AI services\n- OpenAi / Gork / Replicate...]
    LLMs --> Gorq[Gorq LPU]
    User -->Appli_1 & Appli_2 & Appli_3 & Appli_4 & Firefox & ChatApp & etc & LibreOffice


```

# Igora Middlewares (igora-reloaded)
- https://github.com/scenaristeur/igora-reloaded
```mermaid
graph TD;
Igora --> Middlewares
Middlewares[Igora Middlewares] --> Authentification[Authentification\n- annuaire\n- habilitation\n- sécurisation\n- verif absence données sensibles]
Middlewares --> Historique[Historique des conversations\n- interapplicatif\n- par utilisateur\n- par service?]
Middlewares --> RAG[RAG¹\n- Code Général des Imôts\n- Documents métiers...]
Middlewares --> Agents[Agents / Equipe de LLM\n- Microsoft Autogen\n- Crewai]


```

¹ RAG : génération augmentée de récupération (retrieval-augmented generation)
- [Chroma](https://docs.trychroma.com/)
- [rag oracle](https://www.oracle.com/fr/artificial-intelligence/generative-ai/retrieval-augmented-generation-rag/)
- [rag postgres/ pgvector](https://medium.com/@yogi_r/retrieval-augmented-generation-rag-with-pgvector-vector-database-0d741e14d62f)


# Task Management
- synchronisation des tâches basée sur [Yjs](https://github.com/yjs/yjs/blob/main/README.md) / [Crdt](https://fr.wikipedia.org/wiki/Type_de_donn%C3%A9es_r%C3%A9pliqu%C3%A9_sans_conflit) à la façon d'un Kanban
- Yjs permet de synchroniser (via websocket) des objets javascripts "todos", "prepared", "doing", "done"
- chaque client peut modifier et écouter ces différents objets
- [Yjs Awareness](https://github.com/yjs/docs/blob/main/getting-started/adding-awareness.md) permet de connaître la présence des différents acteurs connectés
- Worker est un Worker LLM dont le rôle est d'executer l'inférence LLM (représenté par Customized LLMs sur le premier diagram). Le système peut utiliser plusieurs workers indépendants


```mermaid
sequenceDiagram;
    Worker ->>YjsAwareness: Annonce as state"ready"
    Client ->>YjsAwareness: Annonce
    Client ->>Yjs-Todo: create Task with Task_id in Todo
    Broker ->>Yjs-Todo: read Todo and get new Task
    Broker ->>YjsAwareness: Check Available Worker
    Broker ->>Worker: Change worker state as "working" with Task_id
    Broker ->>Yjs-Prepared: Move Task with Task_id to Prepared
    Worker ->>Yjs-Prepared: Get Task with Task_id
    Worker ->>Yjs-Doing: Move Task with Task_id to Doing and Work on it, update its data
    Note right of Worker: Worker process Task with Task_id
    Worker ->>Yjs-Done: Move Task with Task_id to Done
    Worker ->>YjsAwareness: Annonce as state"ready"
    Client ->>Yjs-Done: Retrieve Result of the Task execution

```
