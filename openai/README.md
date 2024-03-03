# openai compatible igora server
- with voice ? https://medium.com/@sujanxchhetri/creating-a-chatbot-using-socket-io-api-ai-and-web-speech-api-844c3177596b


run on localhost:5678

see test/node_test.js for more details

or 


```

# https://python.langchain.com/docs/integrations/llms/llamacpp#cpu
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_community.llms import LlamaCpp
from langchain_openai import ChatOpenAI

template = """Question: {question}
Réponse : Réglons cela étape par étape pour être sûrs d'avoir la bonne réponse."""

prompt = PromptTemplate.from_template(template)
callback_manager = CallbackManager([StreamingStdOutCallbackHandler()])
llm = ChatOpenAI(openai_api_base="http://127.0.0.1:5678/v1",
                 openai_api_key="sk-xxx",
    )
prompt = """
Je souhaite créer une bande dessinée avec une super héroïne originale. Son métier est à la base le dessin, mais elle développe une application pour créer des comics à base de llm.
"""
resp = llm.invoke(prompt)
print(resp)


```
