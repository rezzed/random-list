import{d as c,r as l,w as r,n as i,a as t,o as m,c as p,b as u,e as d}from"./index.1f081a01.js";const f=["src"],v=["src"],g=c({props:{isPlaying:{type:Boolean},volume:null,name:null},setup(n){const o=n,s=l(null),a=l(null);return r(()=>o.name,async e=>{a.value=null,await i(),a.value=e},{immediate:!0}),t(()=>{const e=s.value;e&&o.volume&&(e.volume=o.volume/100)}),t(()=>{const e=s.value;e&&(o.isPlaying?e.play():(e.pause(),e.currentTime=0))}),(e,y)=>a.value?(m(),p("audio",{key:0,preload:"auto",loop:"",ref_key:"audioElement",ref:s},[u("source",{src:`assets/audio/${a.value}.ogg`,type:"audio/ogg"},null,8,f),u("source",{src:`assets/audio/${a.value}.mp3`,type:"audio/mpeg"},null,8,v)],512)):d("",!0)}});export{g as default};
