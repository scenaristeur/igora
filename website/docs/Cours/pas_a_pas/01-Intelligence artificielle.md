---
slug: intelligence_artificielle
title: Intelligence Artificielle, De quoi on parle exactement ?
authors: [scenaristeur]
tags: [igora, llm, llama-cpp-python, collab]
---


# Intelligence Artificielle

## De quoi on parle exactement ?

Je ne vais pas vous refaire l'historique de l'[Intelligence Artificielle](https://fr.wikipedia.org/wiki/Intelligence_artificielle), le concept n'est pas nouveau, il date des années 50, soit plus de 70 ans. Plus de 70 que des chercheurs de tous pays tentent d'implémenter une machine qui pourrait s'approcher du fonctionnement 
du cerveau humain. 

*Alors pourquoi tout le monde s'emballe aujourd'hui ?*


Parce qu'en 2022, l'entreprise OpenAi a proposé au grand public l'accès à ChatGPT, et cette technologie réussit plutôt bien le [test décrit par Alan Turing](https://fr.wikipedia.org/wiki/Test_de_Turing) en 1950. Et que depuis deux ans, ce domaine qui était assez réservé jusque là et devenu accessible à tout le monde. 

*Comment a-t-on pu mettre un cerveau dans une machine ?*

Le but du "pas à pas" que vous venez d'entamer est de comprendre le fonctionnement de l'intelligence artificielle.
Mais on va pas voir ici, dans le détail, comment on fait pour créer cette machine intelligente. On survolera juste ces notions, pour se concentrer sur comment on peut utiliser ce qui a été développé.

## Allez ! Un petit peu d'entrainement !
Pour créer une intelligence artificielle, qui puisse reproduire le comportement humain, la technique est de l'entrainer. 
Pour qu'elle donne l'impression d'être une personne humaine, il faut qu'elle puisse communiquer, créer des phrases cohérentes.
Et pour ce faire, on va "entraîner un modèle de langage", en lui donnant de nombreux textes, pour lui montrer comment les phrases sont faites, 
comment les idées s'articulent, etc.

En fonction des sources d'informations que l'on donne à notre intelligence artificielle, vous vous doutez bien que les réponses ne seront pas les mêmes,
 car les connaissances injectées ne sont pas les mêmes. 
C'est la raison pour laquelle on trouve de nombreux modèles de langages différents, des modèles généralistes, ou d'autres à qui on va donner des tonnes et des tonnes de pages de code, par exemple pour que notre intelligence artificielle soit capable de générer du code.
Et on peut entraîner des modèles de langages dans la plupart des domaines ou l'activité a généré des écrits... Littérature, Journalisme, Justice...

On peut aussi partir d'un modèle généraliste et le "fine-tuner" en ajoutant une couche supplémentaire pour qu'il soit "compétent" dans un domaine précis.

La langage (génération de texte, traduction, résumé...) sont des tâches parfaitement maitrisées par ces modèles de langages que l'on abrège en général sous le nom de [LLM (Large Language Model)](https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage).

Cette phase d'entraînement est très coûteuse en temps, en argent et en energie. Heureusement, un modèle de langage est réutilisable, et on peut télécharger des 
modèles OpenSource sur des sites comme [Hugging Face](https://huggingface.co/models).

Sur le même principe, on trouve également sur Hugging Face des modèles de langages pour d'autres activités que celles liées au langage. Certains vous permettent de générer des sons, 
des images, des vidéos, des objets en 3D, de changer la voix d'un chanteur,... 

> Si vous souhaitez en savoir plus sur [comment on créé un LLM](https://huggingface.co/learn/nlp-course/fr/chapter1/1), ou sur d'autres modèles (https://huggingface.co/learn), Hugging Face est la solution pour vous.

On ne va donc pas s'attarder ici sur comment ces modèles sont créés, mais comment on peut les utiliser.
Cependant pour comprendre leur utilisation et leur fonctionnement, on va avoir besoin de la notion de vectorisation et d'embeddings.


## Vectorisation & Embeddings






