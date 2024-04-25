# Architecture générale Igora
- https://github.com/scenaristeur/igora
```mermaid

graph LR;
    Appli_1--> Igora[Igora \n endpoint];
    Appli_2--> Igora;

   LibreOffice(LibreOffice)--> Igora;
    Firefox(Firefox extension) --> Igora;
    Appli_3--> Igora;
    Appli_4--> Igora;
    etc[... autres applis métier]--> Igora;
    Igora --> Middlewares[Igora \n Middlewares];
    Middlewares --> LLMs(Customized LLMs)
    LLMs --> Local(Local LLMs\n- node-llama-cpp\n- llama-cpp-python)
    LLMs --> Decentralized(Decentralized LLMs\n- Petals)


```

# Igora Middlewares (igora-reloaded)
- https://github.com/scenaristeur/igora-reloaded
```mermaid
graph TD;
Igora --> Middlewares
Middlewares[Igora Middlewares] --> Authentification[Authentification\n- annuaire\n- habilitation]
Middlewares --> Historique[Historique des conversations\n- interapplicatif\n- par utilisateur\n- par service?]
Middlewares --> RAG[RAG¹\n- Code Général des Imôts\n- Documents métiers...]
Middlewares --> Agents[Agents]




```

¹ RAG : génération augmentée de récupération (retrieval-augmented generation)
- [Chroma](https://docs.trychroma.com/)
- [rag oracle](https://www.oracle.com/fr/artificial-intelligence/generative-ai/retrieval-augmented-generation-rag/)
- [rag postgres/ pgvector](https://medium.com/@yogi_r/retrieval-augmented-generation-rag-with-pgvector-vector-database-0d741e14d62f)
