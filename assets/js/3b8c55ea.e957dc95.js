"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[803],{3668:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>s,contentTitle:()=>t,default:()=>h,frontMatter:()=>a,metadata:()=>r,toc:()=>d});var i=o(4848),l=o(8453);const a={sidebar_label:"Installation",sidebar_position:2},t="Installation",r={id:"installation",title:"Installation",description:"Igora source can be found at https://github.com/scenaristeur/igora, and if you need help, please contact us",source:"@site/docs/installation.md",sourceDirName:".",slug:"/installation",permalink:"/igora/docs/installation",draft:!1,unlisted:!1,editUrl:"https://github.com/scenaristeur/igora/tree/main/website/docs/installation.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_label:"Installation",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Tutorial Intro",permalink:"/igora/docs/intro"},next:{title:"Decentralized Igora",permalink:"/igora/docs/decentralized"}},s={},d=[{value:"Igora backend",id:"igora-backend",level:2},{value:"Install Igora",id:"install-igora",level:3},{value:"Download a model",id:"download-a-model",level:3},{value:"Launch igora backend",id:"launch-igora-backend",level:3}];function c(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,l.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"installation",children:"Installation"}),"\n",(0,i.jsxs)(n.p,{children:["Igora source can be found at ",(0,i.jsx)(n.a,{href:"https://github.com/scenaristeur/igora",children:"https://github.com/scenaristeur/igora"}),", and if you need help, please ",(0,i.jsx)(n.a,{href:"https://github.com/scenaristeur/igora/issues",children:"contact us"})]}),"\n",(0,i.jsx)(n.h1,{id:"hardware",children:"Hardware"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"No GPU needed"}),"\n",(0,i.jsxs)(n.li,{children:["tested on my ",(0,i.jsx)(n.a,{href:"https://www.google.com/search?client=firefox-b-lm&q=ideapad+3+15alc6",children:"Lenovo IdeaPad 3 15ALC6"})," with 16CPU and 16 GB Ram"]}),"\n",(0,i.jsx)(n.li,{children:"tested on a VirtualBox python 3.10 Machine with 4 CPU and 4 GB Ram"}),"\n",(0,i.jsxs)(n.li,{children:["see ",(0,i.jsx)(n.a,{href:"./Igora%20Protocol/Igora%20workers",children:"Igora Workers"}),"  or ",(0,i.jsx)(n.a,{href:"./Igora%20Docker",children:"Igora Docker"})," for more examples"]}),"\n"]}),"\n",(0,i.jsx)(n.h1,{id:"prerequisites",children:"prerequisites"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Linux"}),"\n",(0,i.jsx)(n.li,{children:"git"}),"\n",(0,i.jsx)(n.li,{children:"nodejs >=20"}),"\n",(0,i.jsx)(n.li,{children:"wget for downloading models, or download it manually"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"igora-backend",children:"Igora backend"}),"\n",(0,i.jsx)(n.h3,{id:"install-igora",children:"Install Igora"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"git clone https://github.com/scenaristeur/igora\ncd igora\nnpm install\nnpm run fix\n"})}),"\n",(0,i.jsx)(n.h3,{id:"download-a-model",children:"Download a model"}),"\n",(0,i.jsxs)(n.p,{children:["Igora workers are based on ",(0,i.jsx)(n.a,{href:"https://withcatai.github.io/node-llama-cpp/",children:"node-llama-cpp"})," that uses the ",(0,i.jsx)(n.a,{href:"https://www.google.com/search?q=what+is+%22gguf%22+model&client=firefox-b-lm&sca_esv=21cc0bb16a8a9ef4&biw=1440&bih=783&sxsrf=ACQVn0_FOvhng6QJisXUmX43ARBI-ZwHZA%3A1709674828672&ei=TJHnZfHSKLf3kdUP2aOZQA&ved=0ahUKEwjxqOCGi96EAxW3e6QEHdlRBggQ4dUDCBA&uact=5&oq=what+is+%22gguf%22+model&gs_lp=Egxnd3Mtd2l6LXNlcnAiFHdoYXQgaXMgImdndWYiIG1vZGVsMgcQABiABBgTSMEiUJUQWJkacAJ4AJABAJgBd6AB3QWqAQM2LjK4AQPIAQD4AQGYAgmgAqwFwgIKEAAYRxjWBBiwA8ICBhAAGAcYHpgDAIgGAZAGBJIHAzcuMqAHwwk&sclient=gws-wiz-serp",children:"gguf"})," model."]}),"\n",(0,i.jsxs)(n.p,{children:["(",(0,i.jsx)(n.a,{href:"https://llama-cpp-python.readthedocs.io/en/latest/",children:"llama-cpp-python"})," could be used too)"]}),"\n",(0,i.jsxs)(n.p,{children:["In this installation we will use ",(0,i.jsx)(n.a,{href:"https://huggingface.co/TheBloke/dolphin-2.2.1-mistral-7B-GGUF",children:"dolphin-2.2.1-mistral-7b.Q2_K.gguf"})," but feel free to choose another model and update your .env file with the good model name."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://huggingface.co/TheBloke?search_models=gguf&sort_models=downloads#models",children:"available models"}),' open this page, chose a model (7B or less are a good point to start as they need less memory) then look at "Files and versions" and download the model a Q2, Q3 or Q4 according to the Ram your machine can provide']}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"You can download a gguf model manually and store it in ./models folder then update the MODEL_NAME in your .env"}),"\n",(0,i.jsxs)(n.p,{children:["ex : ",(0,i.jsx)(n.code,{children:'LLM_MODEL_NAME="dolphin-2.2.1-mistral-7b.Q2_K.gguf"'})]}),"\n",(0,i.jsx)(n.p,{children:"Here are two different ways to download the model :"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"npx ipull -s ./models https://huggingface.co/TheBloke/dolphin-2.2.1-mistral-7B-GGUF/resolve/main/dolphin-2.2.1-mistral-7b.Q2_K.gguf\n"})}),"\n",(0,i.jsx)(n.p,{children:"or with wget"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"wget -O ./models/dolphin-2.2.1-mistral-7b.Q2_K.gguf https://huggingface.co/TheBloke/dolphin-2.2.1-mistral-7B-GGUF/resolve/main/dolphin-2.2.1-mistral-7b.Q2_K.gguf?download=true\n"})}),"\n",(0,i.jsx)(n.h1,{id:"the-env-file",children:"the .env file"}),"\n",(0,i.jsx)(n.p,{children:"There are 3 .env files :"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:".env-example in igora folder : this is the default example file that you can copy to create your .env file"}),"\n",(0,i.jsx)(n.li,{children:".env in igora folder : this is your .env file, it is read by the igora backend to configure the workers and determine the model, the mode you want to use (local or remote) , the url of the y-websocket server and the market room."}),"\n",(0,i.jsx)(n.li,{children:'.env in igora_web folder : this one is used by the web app / client ! be carefull , all the settings in igora_web/.env file need to start with "VUE_" to be accessed by the web app'}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"example of .env file"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'YJS_ENV=local # local, remote\nYJS_LOCAL_URL="ws://localhost:1234" # your local y-websocket server\nYJS_REMOTE_URL="wss://ylm-websocket.glitch.me/" # the remote y-websocket server\nYJS_MARKET_ROOM="market"\nLLM_MODEL_NAME="dolphin-2.2.1-mistral-7b.Q2_K.gguf"\n\n'})}),"\n",(0,i.jsx)(n.h3,{id:"launch-igora-backend",children:"Launch igora backend"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npm run start\n\n"})})]})}function h(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},8453:(e,n,o)=>{o.d(n,{R:()=>t,x:()=>r});var i=o(6540);const l={},a=i.createContext(l);function t(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:t(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);