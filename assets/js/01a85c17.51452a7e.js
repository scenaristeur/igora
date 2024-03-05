"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[209],{6535:(e,s,t)=>{t.d(s,{A:()=>v});var a=t(6540),i=t(4164),r=t(781),l=t(4581),n=t(8774),c=t(1312),o=t(6347),m=t(9169);function d(e){const{pathname:s}=(0,o.zy)();return(0,a.useMemo)((()=>e.filter((e=>function(e,s){return!(e.unlisted&&!(0,m.ys)(e.permalink,s))}(e,s)))),[e,s])}const u={sidebar:"sidebar_re4s",sidebarItemTitle:"sidebarItemTitle_pO2u",sidebarItemList:"sidebarItemList_Yudw",sidebarItem:"sidebarItem__DBe",sidebarItemLink:"sidebarItemLink_mo7H",sidebarItemLinkActive:"sidebarItemLinkActive_I1ZP"};var g=t(4848);function h(e){let{sidebar:s}=e;const t=d(s.items);return(0,g.jsx)("aside",{className:"col col--3",children:(0,g.jsxs)("nav",{className:(0,i.A)(u.sidebar,"thin-scrollbar"),"aria-label":(0,c.T)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"}),children:[(0,g.jsx)("div",{className:(0,i.A)(u.sidebarItemTitle,"margin-bottom--md"),children:s.title}),(0,g.jsx)("ul",{className:(0,i.A)(u.sidebarItemList,"clean-list"),children:t.map((e=>(0,g.jsx)("li",{className:u.sidebarItem,children:(0,g.jsx)(n.A,{isNavLink:!0,to:e.permalink,className:u.sidebarItemLink,activeClassName:u.sidebarItemLinkActive,children:e.title})},e.permalink)))})]})})}var b=t(5600);function p(e){let{sidebar:s}=e;const t=d(s.items);return(0,g.jsx)("ul",{className:"menu__list",children:t.map((e=>(0,g.jsx)("li",{className:"menu__list-item",children:(0,g.jsx)(n.A,{isNavLink:!0,to:e.permalink,className:"menu__link",activeClassName:"menu__link--active",children:e.title})},e.permalink)))})}function j(e){return(0,g.jsx)(b.GX,{component:p,props:e})}function x(e){let{sidebar:s}=e;const t=(0,l.l)();return s?.items.length?"mobile"===t?(0,g.jsx)(j,{sidebar:s}):(0,g.jsx)(h,{sidebar:s}):null}function v(e){const{sidebar:s,toc:t,children:a,...l}=e,n=s&&s.items.length>0;return(0,g.jsx)(r.A,{...l,children:(0,g.jsx)("div",{className:"container margin-vert--lg",children:(0,g.jsxs)("div",{className:"row",children:[(0,g.jsx)(x,{sidebar:s}),(0,g.jsx)("main",{className:(0,i.A)("col",{"col--7":n,"col--9 col--offset-1":!n}),itemScope:!0,itemType:"https://schema.org/Blog",children:a}),t&&(0,g.jsx)("div",{className:"col col--2",children:t})]})})})}},9158:(e,s,t)=>{t.r(s),t.d(s,{default:()=>p});t(6540);var a=t(4164),i=t(1312);const r=()=>(0,i.T)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"});var l=t(1003),n=t(7559),c=t(6535),o=t(6133),m=t(1107);const d={tag:"tag_Nnez"};var u=t(4848);function g(e){let{letterEntry:s}=e;return(0,u.jsxs)("article",{children:[(0,u.jsx)(m.A,{as:"h2",id:s.letter,children:s.letter}),(0,u.jsx)("ul",{className:"padding--none",children:s.tags.map((e=>(0,u.jsx)("li",{className:d.tag,children:(0,u.jsx)(o.A,{...e})},e.permalink)))}),(0,u.jsx)("hr",{})]})}function h(e){let{tags:s}=e;const t=function(e){const s={};return Object.values(e).forEach((e=>{const t=function(e){return e[0].toUpperCase()}(e.label);s[t]??=[],s[t].push(e)})),Object.entries(s).sort(((e,s)=>{let[t]=e,[a]=s;return t.localeCompare(a)})).map((e=>{let[s,t]=e;return{letter:s,tags:t.sort(((e,s)=>e.label.localeCompare(s.label)))}}))}(s);return(0,u.jsx)("section",{className:"margin-vert--lg",children:t.map((e=>(0,u.jsx)(g,{letterEntry:e},e.letter)))})}var b=t(1463);function p(e){let{tags:s,sidebar:t}=e;const i=r();return(0,u.jsxs)(l.e3,{className:(0,a.A)(n.G.wrapper.blogPages,n.G.page.blogTagsListPage),children:[(0,u.jsx)(l.be,{title:i}),(0,u.jsx)(b.A,{tag:"blog_tags_list"}),(0,u.jsxs)(c.A,{sidebar:t,children:[(0,u.jsx)(m.A,{as:"h1",children:i}),(0,u.jsx)(h,{tags:s})]})]})}},6133:(e,s,t)=>{t.d(s,{A:()=>n});t(6540);var a=t(4164),i=t(8774);const r={tag:"tag_zVej",tagRegular:"tagRegular_sFm0",tagWithCount:"tagWithCount_h2kH"};var l=t(4848);function n(e){let{permalink:s,label:t,count:n}=e;return(0,l.jsxs)(i.A,{href:s,className:(0,a.A)(r.tag,n?r.tagWithCount:r.tagRegular),children:[t,n&&(0,l.jsx)("span",{children:n})]})}}}]);