"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[3976],{1512:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var t=n(4848),s=n(8453);const o={sidebar_position:1},i="Tutorial Intro",a={id:"intro",title:"Tutorial Intro",description:"Let's discover Igora Protocol and learn how to use it in less than 5 minutes.",source:"@site/docs/intro.md",sourceDirName:".",slug:"/intro",permalink:"/igora/docs/intro",draft:!1,unlisted:!1,editUrl:"https://github.com/scenaristeur/igora/tree/main/website/docs/intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"Installation",permalink:"/igora/docs/installation"}},l={},c=[{value:"Understanding Igora concepts",id:"understanding-igora-concepts",level:2},{value:"A Worker runs a LLM",id:"a-worker-runs-a-llm",level:3},{value:"A worker offer its services on a market",id:"a-worker-offer-its-services-on-a-market",level:3},{value:"A client create a job",id:"a-client-create-a-job",level:3},{value:"Getting Started",id:"getting-started",level:2}];function d(e){const r={a:"a",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.h1,{id:"tutorial-intro",children:"Tutorial Intro"}),"\n",(0,t.jsxs)(r.p,{children:["Let's discover ",(0,t.jsx)(r.strong,{children:"Igora Protocol"})," and ",(0,t.jsx)(r.strong,{children:"learn how to use it in less than 5 minutes"}),"."]}),"\n",(0,t.jsxs)(r.p,{children:["Igora stands for ",(0,t.jsx)(r.strong,{children:"I-ntelligent A-gora"}),". With ",(0,t.jsx)(r.a,{href:"https://en.wikipedia.org/wiki/Agora",children:"Agora"}),' meaning "market" in Modern Greek, a central public space in ancient Greek city-states.']}),"\n",(0,t.jsx)(r.p,{children:"The goal of Igora is to provide everyone, everywhere with llms (large language model) that can communicate with each other."}),"\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.em,{children:(0,t.jsx)(r.strong,{children:"IGORA PROTOCOL"})})," uses 4 major basic concepts : ",(0,t.jsx)(r.em,{children:(0,t.jsx)(r.strong,{children:"clients"})})," ask ",(0,t.jsx)(r.em,{children:(0,t.jsx)(r.strong,{children:"workers"})})," to do ",(0,t.jsx)(r.em,{children:(0,t.jsx)(r.strong,{children:"tasks"})})," or jobs. The ",(0,t.jsx)(r.em,{children:(0,t.jsx)(r.strong,{children:"market"})})," is the place where ",(0,t.jsx)(r.em,{children:(0,t.jsx)(r.strong,{children:"workers"})})," and ",(0,t.jsx)(r.em,{children:(0,t.jsx)(r.strong,{children:"clients"})})," communicate."]}),"\n",(0,t.jsx)(r.h2,{id:"understanding-igora-concepts",children:"Understanding Igora concepts"}),"\n",(0,t.jsxs)(r.p,{children:["What is a LLM -> ",(0,t.jsx)(r.a,{href:"https://www.youtube.com/watch?v=osKyvYJ3PRM",children:"https://www.youtube.com/watch?v=osKyvYJ3PRM"})]}),"\n",(0,t.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/osKyvYJ3PRM?si=zLg-od7MQ6QEKVxA",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),"\n",(0,t.jsx)(r.h3,{id:"a-worker-runs-a-llm",children:"A Worker runs a LLM"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:["A ",(0,t.jsx)(r.em,{children:(0,t.jsx)(r.strong,{children:(0,t.jsx)(r.a,{href:"https://en.wikipedia.org/wiki/Large_language_model",children:"Large Language Model"})})}),' ( LLM ) is a model that can "understand" and generate natural language.']}),"\n"]}),"\n",(0,t.jsx)(r.p,{children:"You have certainely heard about Chat-GPT by OpenAI. This a is big example of LLM. But other solutions exists, that allow us to use LLMS has opensource models and to develop\napplications based on this technology."}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:["A ",(0,t.jsx)(r.em,{children:(0,t.jsx)(r.strong,{children:"worker"})})," is a machine (computer, server...) that serve the LLM. You can ask the worker to generate a response to a ",(0,t.jsx)(r.em,{children:(0,t.jsx)(r.strong,{children:"prompt"})}),"."]}),"\n",(0,t.jsxs)(r.li,{children:["A ",(0,t.jsx)(r.em,{children:(0,t.jsx)(r.strong,{children:(0,t.jsx)(r.a,{href:"https://en.wikipedia.org/wiki/Prompt_engineering",children:"prompt"})})})," is a text that the LLM is asked to respond to."]}),"\n",(0,t.jsxs)(r.li,{children:["A ",(0,t.jsx)(r.em,{children:(0,t.jsx)(r.strong,{children:"response"})})," is the text generated by the LLM."]}),"\n",(0,t.jsxs)(r.li,{children:["A ",(0,t.jsx)(r.em,{children:(0,t.jsx)(r.strong,{children:"systemPrompt"})})," is a prompt that guide the worker to tell him how to generate a response (Maths teacher, Botanic expert...)."]}),"\n"]}),"\n",(0,t.jsx)(r.h3,{id:"a-worker-offer-its-services-on-a-market",children:"A worker offer its services on a market"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:["Igora protocol is based on ",(0,t.jsx)(r.a,{href:"https://docs.yjs.dev/",children:"Yjs"})," that allow us to create a distributed database of Workers where clients can ask a worker to accomplish a task."]}),"\n"]}),"\n",(0,t.jsx)(r.h3,{id:"a-client-create-a-job",children:"A client create a job"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:"A client create a job and ask for its completion on the market."}),"\n",(0,t.jsxs)(r.li,{children:["The market (with the help of a ",(0,t.jsx)(r.em,{children:(0,t.jsx)(r.strong,{children:"broker"})}),") will give the job to a worker."]}),"\n",(0,t.jsx)(r.li,{children:"The worker will do the job and give a response to the client."}),"\n"]}),"\n",(0,t.jsx)(r.h2,{id:"getting-started",children:"Getting Started"}),"\n",(0,t.jsxs)(r.p,{children:["There are two ways to get started with ",(0,t.jsx)(r.em,{children:(0,t.jsx)(r.strong,{children:"Igora Protocol"})}),":"]}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:["You can ",(0,t.jsx)(r.a,{href:"/docs/installation",children:"create a Igora stack in local market"})," (a worker and a client on your own computer).","\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:"Avantages : your data stay on your computer,"}),"\n",(0,t.jsx)(r.li,{children:"Disadvantages : you can not use other llms or workers."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(r.li,{children:["You can ",(0,t.jsx)(r.a,{href:"/docs/decentralized",children:"use decentralized Igora market"}),". Allowing you to use Igora protocol on a decentralized network.\nWith this way, market, worker(s) and client(s) are distributed on the network. You specify which machine is a worker and which machine is a client. Advantages: Use a large bunch of llm , earn money or tokens with your workers"]}),"\n"]})]})}function h(e={}){const{wrapper:r}={...(0,s.R)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,r,n)=>{n.d(r,{R:()=>i,x:()=>a});var t=n(6540);const s={},o=t.createContext(s);function i(e){const r=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function a(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),t.createElement(o.Provider,{value:r},e.children)}}}]);