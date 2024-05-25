"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[5648],{1290:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>i,contentTitle:()=>a,default:()=>p,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var l=o(4848),t=o(8453);const r={slug:"Pour_bien_demarrer_avec_les_LLM",title:"Pour bien d\xe9marrer avec les LLM",authors:["scenaristeur"],tags:["igora","llm","llama-cpp-python","collab"]},a="Pour bien d\xe9marrer avec les LLM",s={id:"Cours/pas_a_pas/pour-bien-demarre",title:"Pour bien d\xe9marrer avec les LLM",description:"Pour bien comprendre de quoi on parle quand il est question d'Intelligence Artificielle G\xe9n\xe9rative",source:"@site/docs/Cours/pas_a_pas/02-pour-bien-demarre.md",sourceDirName:"Cours/pas_a_pas",slug:"/Cours/pas_a_pas/Pour_bien_demarrer_avec_les_LLM",permalink:"/igora/docs/Cours/pas_a_pas/Pour_bien_demarrer_avec_les_LLM",draft:!1,unlisted:!1,editUrl:"https://github.com/scenaristeur/igora/tree/main/website/docs/Cours/pas_a_pas/02-pour-bien-demarre.md",tags:[{label:"igora",permalink:"/igora/docs/tags/igora"},{label:"llm",permalink:"/igora/docs/tags/llm"},{label:"llama-cpp-python",permalink:"/igora/docs/tags/llama-cpp-python"},{label:"collab",permalink:"/igora/docs/tags/collab"}],version:"current",sidebarPosition:2,frontMatter:{slug:"Pour_bien_demarrer_avec_les_LLM",title:"Pour bien d\xe9marrer avec les LLM",authors:["scenaristeur"],tags:["igora","llm","llama-cpp-python","collab"]},sidebar:"tutorialSidebar",previous:{title:"Intelligence Artificielle, De quoi on parle exactement ?",permalink:"/igora/docs/Cours/pas_a_pas/intelligence_artificielle"},next:{title:"Run Igora in Docker",permalink:"/igora/docs/Igora Docker"}},i={},c=[{value:"1 T\xe9l\xe9chargement d&#39;un mod\xe8le de langage (dolphin)",id:"1-t\xe9l\xe9chargement-dun-mod\xe8le-de-langage-dolphin",level:2},{value:"2 Installation d&#39;un moteur d&#39;inf\xe9rence (llama-cpp-python)",id:"2-installation-dun-moteur-dinf\xe9rence-llama-cpp-python",level:2},{value:"3 Interrogation du mod\xe8le de langage via le moteur d&#39;inf\xe9rence (Nomme les plan\xe8tes du syst\xe8me solaire)",id:"3-interrogation-du-mod\xe8le-de-langage-via-le-moteur-dinf\xe9rence-nomme-les-plan\xe8tes-du-syst\xe8me-solaire",level:2},{value:"Bravo!!!,",id:"bravo",level:2}];function d(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h1,{id:"pour-bien-d\xe9marrer-avec-les-llm",children:"Pour bien d\xe9marrer avec les LLM"}),"\n",(0,l.jsxs)(n.p,{children:["Pour bien comprendre de quoi on parle quand il est question d'",(0,l.jsx)(n.strong,{children:"Intelligence Artificielle G\xe9n\xe9rative"}),"\net pour appr\xe9hender au mieux les LLM (Large Mod\xe8le de Langage), nous allons proc\xe9der en 3 \xe9tapes\nque vous pouvez suivre sur ",(0,l.jsx)(n.a,{href:"https://colab.research.google.com/github/scenaristeur/igora/blob/main/notebooks/llama_cpp_python_fr.ipynb",children:(0,l.jsx)(n.img,{src:"https://colab.research.google.com/assets/colab-badge.svg",alt:"Open In Colab"})})]}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsx)(n.p,{children:'sur google colab, les commandes "syst\xe8me" sont pr\xe9c\xe9d\xe9es par un point d\'exclamation.'}),"\n"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"1 T\xe9l\xe9chargement d'un mod\xe8le de langage (dolphin)"}),"\n",(0,l.jsx)(n.li,{children:"2 Installation d'un moteur d'inf\xe9rence (llama-cpp-python)"}),"\n",(0,l.jsx)(n.li,{children:"3 Interrogation du mod\xe8le de langage via le moteur d'inf\xe9rence (Nomme les plan\xe8tes du syst\xe8me solaire)"}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"1-t\xe9l\xe9chargement-dun-mod\xe8le-de-langage-dolphin",children:"1 T\xe9l\xe9chargement d'un mod\xe8le de langage (dolphin)"}),"\n",(0,l.jsx)(n.p,{children:'Commen\xe7ons par cr\xe9er un dossier "models"'}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:"mkdir ./models\n"})}),"\n",(0,l.jsx)(n.p,{children:"Nous pouvons maintenant t\xe9l\xe9charger un mod\xe8le de langage."}),"\n",(0,l.jsxs)(n.p,{children:['Commen\xe7ons avec un "petit" mod\xe8le de langage, Dolphin, bas\xe9 sur Mistral dont on peut trouver la description sur HuggingFace ',(0,l.jsx)(n.a,{href:"https://huggingface.co/TheBloke/dolphin-2.2.1-mistral-7B-GGUF",children:"https://huggingface.co/TheBloke/dolphin-2.2.1-mistral-7B-GGUF"})]}),"\n",(0,l.jsxs)(n.p,{children:["Sur la page de t\xe9l\xe9chargement ",(0,l.jsx)(n.a,{href:"https://huggingface.co/TheBloke/dolphin-2.2.1-mistral-7B-GGUF/tree/main",children:"https://huggingface.co/TheBloke/dolphin-2.2.1-mistral-7B-GGUF/tree/main"}),', il existe plusieurs versions Q2, Q3... qui correspondent \xe0 la "compression" ou ',(0,l.jsx)(n.a,{href:"https://inside-machinelearning.com/quantization-tensorflow/",children:"quantization"})," du mod\xe8le"]}),"\n",(0,l.jsx)(n.p,{children:"On peut t\xe9l\xe9charger ce mod\xe8le dolphin-2.2.1-mistral-7B-GGUF avec wget"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:"!wget -O ./models/dolphin-2.2.1-mistral-7b.Q2_K.gguf https://huggingface.co/TheBloke/dolphin-2.2.1-mistral-7B-GGUF/resolve/main/dolphin-2.2.1-mistral-7b.Q2_K.gguf?download=true\n"})}),"\n",(0,l.jsx)(n.p,{children:"C'est la premi\xe8re cellule dans le Google colab et vous pouvez l'executer en cliquant"}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.img,{alt:"lancement colab",src:o(8984).A+"",width:"884",height:"432"})}),"\n",(0,l.jsxs)(n.p,{children:["Si tout ce passe bien, vous devriez maintenant voir dans les fichiers locaux de votre colab ",(0,l.jsx)(n.a,{href:"https://colab.research.google.com/github/scenaristeur/igora/blob/main/notebooks/llama_cpp_python_fr.ipynb",children:(0,l.jsx)(n.img,{src:"https://colab.research.google.com/assets/colab-badge.svg",alt:"Open In Colab"})})," votre mod\xe8le."]}),"\n",(0,l.jsx)(n.h2,{id:"2-installation-dun-moteur-dinf\xe9rence-llama-cpp-python",children:"2 Installation d'un moteur d'inf\xe9rence (llama-cpp-python)"}),"\n",(0,l.jsxs)(n.p,{children:["Pour le moteur d'inf\xe9rence, on va utiliser ",(0,l.jsx)(n.a,{href:"https://llama-cpp-python.readthedocs.io/en/latest/",children:"llama-cpp-python"})," simplement avec la commande :"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:"pip install llama-cpp-python[server] --extra-index-url https://abetlen.github.io/llama-cpp-python/whl/cpu\n"})}),"\n",(0,l.jsx)(n.p,{children:"Comme pr\xe9c\xe9demment vous pouvez la lancer dans Colab en cliquant sur le triangle correspondant \xe0 la cellule."}),"\n",(0,l.jsx)(n.h2,{id:"3-interrogation-du-mod\xe8le-de-langage-via-le-moteur-dinf\xe9rence-nomme-les-plan\xe8tes-du-syst\xe8me-solaire",children:"3 Interrogation du mod\xe8le de langage via le moteur d'inf\xe9rence (Nomme les plan\xe8tes du syst\xe8me solaire)"}),"\n",(0,l.jsx)(n.p,{children:"La derni\xe8re \xe9tape est d'impl\xe9menter un tout petit code pour"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["importer notre moteur d'inf\xe9rence(llama-cpp) ",(0,l.jsx)(n.code,{children:"from llama_cpp import Llama"})]}),"\n",(0,l.jsx)(n.li,{children:"en utilisant ce moteur d'inf\xe9rence, on cr\xe9\xe9 notre llm"}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:'llm = Llama(\n      model_path="./models/dolphin-2.2.1-mistral-7b.Q2_K.gguf"\n)\n'})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"et on interroge notre llm en lui passant la question \xe0 laquelle on souhaite qu'il r\xe9ponde, puis on affiche la r\xe9ponse"}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:'output = llm(\n      "Q: (Nomme les plan\xe8tes du syst\xe8me solaire). A: ", # Prompt\n      max_tokens=150, # Generate up to 32 tokens, set to None to generate up to the end of the context window\n      stop=["Q:", "\\n"], # Stop generating just before the model would generate a new question\n      echo=True # Echo the prompt back in the output\n) # Generate a completion, can also call create_completion\nprint(output)\n'})}),"\n",(0,l.jsx)(n.p,{children:"Le code complet nous donne donc"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:'from llama_cpp import Llama\nllm = Llama(\n      model_path="./models/dolphin-2.2.1-mistral-7b.Q2_K.gguf",\n      # n_gpu_layers=-1, # Uncomment to use GPU acceleration\n      # seed=1337, # Uncomment to set a specific seed\n      # n_ctx=2048, # Uncomment to increase the context window\n)\noutput = llm(\n      "Q: (Nomme les plan\xe8tes du syst\xe8me solaire). A: ", # Prompt\n      max_tokens=150, # Generate up to 32 tokens, set to None to generate up to the end of the context window\n      stop=["Q:", "\\n"], # Stop generating just before the model would generate a new question\n      echo=True # Echo the prompt back in the output\n) # Generate a completion, can also call create_completion\nprint(output)\nreponse = output[\'choices\'][0]["text"]\nprint("\\nR\xe9ponse", reponse)\n'})}),"\n",(0,l.jsx)(n.p,{children:"Et le r\xe9sultat :"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:"{'id': 'cmpl-f517be80-5ad2-4955-8535-e4e8863e0358', 'object': 'text_completion', 'created': 1714385686, 'model': './models/dolphin-2.2.1-mistral-7b.Q2_K.gguf', 'choices': [{'text': 'Q: (Nomme les plan\xe8tes du syst\xe8me solaire). A:  Les plan\xe8tes du syst\xe8me solaire sont:', 'index': 0, 'logprobs': None, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 20, 'completion_tokens': 12, 'total_tokens': 32}}\n\nR\xe9ponse Q: (Nomme les plan\xe8tes du syst\xe8me solaire). A: 1. Mercure 2. V\xe9nus 3. La Terre 4. Mars 5. Jupiter 6. Saturne 7. Uranus 8. Neptune\n"})}),"\n",(0,l.jsx)(n.h2,{id:"bravo",children:"Bravo!!!,"}),"\n",(0,l.jsx)(n.p,{children:"vous avez impl\xe9ment\xe9 votre premier LLM et vous pouvez l'utiliser, par exemple en changeant la question"}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.strong,{children:'"Q: (Nomme les plan\xe8tes du syst\xe8me solaire). A: "'})}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:'Evidemment, il existe des tonnes de param\xe8tres, de personnalisation pour leur demander des choses plus pr\xe9cises, orienter votre llm en lui imposant une fa\xe7on d\'agir avec un "prompt syst\xe8me"...'})]})}function p(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(d,{...e})}):d(e)}},8984:(e,n,o)=>{o.d(n,{A:()=>l});const l=o.p+"assets/images/lancement_colab-19c0f260e221d998c295f49371beed2e.png"},8453:(e,n,o)=>{o.d(n,{R:()=>a,x:()=>s});var l=o(6540);const t={},r=l.createContext(t);function a(e){const n=l.useContext(r);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),l.createElement(r.Provider,{value:n},e.children)}}}]);