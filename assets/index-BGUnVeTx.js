var Ae=Object.create;var ee=Object.defineProperty;var qe=Object.getOwnPropertyDescriptor;var ue=(t,e)=>(e=Symbol[t])?e:Symbol.for("Symbol."+t),T=t=>{throw TypeError(t)};var xe=(t,e,i)=>e in t?ee(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var de=(t,e)=>ee(t,"name",{value:e,configurable:!0});var _=t=>[,,,Ae((t==null?void 0:t[ue("metadata")])??null)],me=["class","method","getter","setter","accessor","field","value","get","set"],Y=t=>t!==void 0&&typeof t!="function"?T("Function expected"):t,Ke=(t,e,i,n,o)=>({kind:me[t],name:e,metadata:n,addInitializer:l=>i._?T("Already initialized"):o.push(Y(l||null))}),R=(t,e)=>xe(e,ue("metadata"),t[3]),C=(t,e,i,n)=>{for(var o=0,l=t[e>>1],a=l&&l.length;o<a;o++)e&1?l[o].call(i):n=l[o].call(i,n);return n},h=(t,e,i,n,o,l)=>{var a,u,S,f,Q,d=e&7,Z=!!(e&8),v=!!(e&16),J=d>3?t.length+1:d?Z?1:2:0,ce=me[d+5],ae=d>3&&(t[J-1]=[]),We=t[J]||(t[J]=[]),b=d&&(!v&&!Z&&(o=o.prototype),d<5&&(d>3||!v)&&qe(d<4?o:{get[i](){return he(this,l)},set[i](p){return fe(this,l,p)}},i));d?v&&d<4&&de(l,(d>2?"set ":d>1?"get ":"")+i):de(o,i);for(var U=n.length-1;U>=0;U--)f=Ke(d,i,S={},t[3],We),d&&(f.static=Z,f.private=v,Q=f.access={has:v?p=>Qe(o,p):p=>i in p},d^3&&(Q.get=v?p=>(d^1?he:Ze)(p,o,d^4?l:b.get):p=>p[i]),d>2&&(Q.set=v?(p,V)=>fe(p,o,V,d^4?l:b.set):(p,V)=>p[i]=V)),u=(0,n[U])(d?d<4?v?l:b[ce]:d>4?void 0:{get:b.get,set:b.set}:o,f),S._=1,d^4||u===void 0?Y(u)&&(d>4?ae.unshift(u):d?v?l=u:b[ce]=u:o=u):typeof u!="object"||u===null?T("Object expected"):(Y(a=u.get)&&(b.get=a),Y(a=u.set)&&(b.set=a),Y(a=u.init)&&ae.unshift(a));return d||R(t,o),b&&ee(o,i,b),v?d^4?l:b:o},x=(t,e,i)=>xe(t,typeof e!="symbol"?e+"":e,i),te=(t,e,i)=>e.has(t)||T("Cannot "+i),Qe=(t,e)=>Object(e)!==e?T('Cannot use the "in" operator on this value'):t.has(e),he=(t,e,i)=>(te(t,e,"read from private field"),i?i.call(t):e.get(t));var fe=(t,e,i,n)=>(te(t,e,"write to private field"),n?n.call(t,i):e.set(t,i),i),Ze=(t,e,i)=>(te(t,e,"access private method"),i);import{j as c,r as y,R as Je}from"./react-CXXiqcDJ.js";import{c as Ue}from"./react-dom-OCKdqRoB.js";import{o as H,b as D,d as m}from"./mobx-DTynNhHD.js";import{d as W,l as le,f as Ve}from"./styled-components-CS8CnNIT.js";import{m as G,T as et,B as Ge}from"./@pixi-BV13E6tz.js";import{u as tt}from"./react-responsive-Bh0joHWA.js";import{o as K,P as it}from"./mobx-react-BdAWeejt.js";import"./pixi.js-7IUEEjbf.js";import"./eventemitter3-DI_Ezc7w.js";import"./earcut-B_XXjThm.js";import"./url-BeYJp5ai.js";import"./scheduler-CzFDRTuY.js";import"./tslib-wbdO-F7s.js";import"./@emotion-sScrWPmR.js";import"./stylis-DinRj2j6.js";import"./prop-types-Dz_6xKC0.js";import"./ismobilejs-CHLuctl-.js";import"./matchmediaquery-DHu3n6Yn.js";import"./css-mediaquery-DcYbJrVh.js";import"./hyphenate-style-name-HOLnhz8K.js";import"./shallow-equal-BQUY1Bas.js";import"./mobx-react-lite-D_7G1WmJ.js";import"./use-sync-external-store-XEI2_oLv.js";import"./qs-CWD4nPQT.js";import"./side-channel-L5xT8F0U.js";import"./get-intrinsic-BKEvijrG.js";import"./es-errors-DzOT6E3C.js";import"./has-symbols-eVqrYdw7.js";import"./has-proto-JnoBQRdH.js";import"./function-bind-BbkWVFrm.js";import"./hasown-DYqjtFKE.js";import"./call-bind-Bt3bzbWQ.js";import"./set-function-length-B5OANX0j.js";import"./define-data-property-DO9o5wXF.js";import"./es-define-property-tzmkNPou.js";import"./gopd-CEkvUycD.js";import"./has-property-descriptors-DphFXkuo.js";import"./object-inspect-BwGSHIBu.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(o){if(o.ep)return;o.ep=!0;const l=i(o);fetch(o.href,l)}})();var Se,be,ve,we,P;we=[H],ve=[m],be=[m],Se=[m];class E{constructor(){C(P,5,this);x(this,"data",C(P,8,this,{grid:0,rects:[],pallete:[],isColoring:!1})),C(P,11,this);D(this)}setColoring(e){this.data=e}clearStore(){this.data={grid:0,rects:[],pallete:[],isColoring:!1}}setPallete(e){this.data.pallete=e}getColorRect(e){const i=this.data.rects.find(n=>n.indexRect===e);return i?this.data.pallete[i.indexColor]:void 0}getCurrentColorIndex(e){const i=this.data.rects.find(n=>n.indexRect===e);return i&&i.currentColorIndex!==void 0?i.currentColorIndex:void 0}getCurrentColor(e){const i=this.data.rects.find(n=>n.indexRect===e);return i&&i.currentColorIndex!==void 0?this.data.pallete[i.currentColorIndex]:void 0}getColorIndex(e){const i=this.data.rects.find(n=>n.indexRect===e);return i?i.indexColor:void 0}}P=_(null),h(P,1,"setColoring",ve,E),h(P,1,"clearStore",be,E),h(P,1,"setPallete",Se,E),h(P,5,"data",we,E),R(P,E);const r=new E;function Ce(t){r.clearStore(),r.setColoring(t)}const ot={isColoring:!1,grid:5,pallete:["#ff0000","#00ff00","#0000ff"],rects:[{indexRect:0,indexColor:0},{indexRect:6,indexColor:0},{indexRect:12,indexColor:0},{indexRect:18,indexColor:0},{indexRect:24,indexColor:0}]},nt={isColoring:!0,grid:5,pallete:["#ff0000","#00ff00"],rects:[{indexRect:0,indexColor:0,currentColorIndex:0},{indexRect:6,indexColor:1},{indexRect:12,indexColor:1},{indexRect:13,currentColorIndex:0},{indexRect:18,indexColor:0},{indexRect:24,indexColor:0}]},st=W.button`
  padding: ${t=>t.$icon?"5px":"0"};
  color: #333;
  font-size: 1em;
  border: ${t=>t.$icon?"1px solid #b3b0b0":"none"};
  background-color: ${t=>t.$icon?"#fff":"transparent"};
  cursor: pointer;
  ${t=>{if(t.$absolute)return le`
        position: absolute;
        top: 1em;
        left: 1em;
      `}}

  ${t=>{if(t.$icon)return le`
        border-radius: 10px;
        box-shadow: 3px 3px 0px 0px rgba(179, 176, 176, 0.5);
        & svg path {
          stroke: #333;
          stroke-width: 2;
        }
      `}}
`,ge=W.button`
  width: 60px;
  height: 60px;
  color: #fff;
  background-color: ${t=>t.$color?t.$color:"#fff"};
  border: 1px solid #b3b0b0;
  border-radius: 50%;
  cursor: pointer;
  ${t=>{if(t.$color)return le`
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5em;
      `}}
`,lt=W.div`
  position: relative;
  display: flex;
  flex-direction: column;
`,rt=W.div`
  height: 87vh;
`,ct=()=>c.jsx("svg",{width:"32",height:"32",viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:c.jsx("path",{d:"M20 8L12 16L20 24"})});var ze,Re,_e,Pe,M;Pe=[m],_e=[m],Re=[m],ze=[m];class F{constructor(){C(M,5,this);D(this)}createCanvas(e){r.clearStore(),r.data={isColoring:!1,grid:e,rects:[],pallete:[]},console.log(r.data)}addRect(e,i){const n=r.data.rects.findIndex(l=>l.indexRect===e),o=r.data.pallete.findIndex(l=>l===i);if(n!==-1){if(r.data.isColoring){r.data.rects[n].currentColorIndex=o;return}r.data.rects[n].indexColor=o}else{if(r.data.isColoring){r.data.rects.push({indexRect:e,currentColorIndex:o});return}r.data.rects.push({indexRect:e,indexColor:o})}}clearRect(e){const i=r.data.rects.findIndex(n=>n.indexRect===e);if(i!==-1){if(r.data.isColoring&&r.data.rects[i].indexColor!==void 0){r.data.rects[i].currentColorIndex=void 0;return}r.data.rects.splice(i,1)}console.log(r.data)}saveCanvas(){console.log(r.data)}}M=_(null),h(M,1,"createCanvas",Pe,F),h(M,1,"addRect",_e,F),h(M,1,"clearRect",Re,F),h(M,1,"saveCanvas",ze,F),R(M,F);const q=new F,at=()=>{q.saveCanvas()},dt=({editor:t,pallete:e})=>c.jsxs(lt,{children:[c.jsx(st,{$absolute:!0,$icon:!0,onClick:()=>at(),children:c.jsx(ct,{})}),t,e]});function ht(t,e){const i=[];for(let n=0;n<t;n++)for(let o=0;o<t;o++)i.push({y:n*e,x:o*e});return i}const ie=45;var je,Me,Ie,Ee,w;Ee=[H],Ie=[H],Me=[m],je=[m];class k{constructor(){C(w,5,this);x(this,"scale",C(w,8,this,1)),C(w,11,this);x(this,"position",C(w,12,this,{x:1e4,y:1e4})),C(w,15,this);x(this,"sceneSize",{width:0,height:0});x(this,"containerSize",0);x(this,"cellSize",0);x(this,"pivot",0);x(this,"coordinatesRects",[]);x(this,"maxScale",1);D(this)}setPosition(e){this.position=e}startSettings(e){const i=window.innerWidth<window.innerHeight?window.innerWidth:window.innerHeight,n=document.getElementById("pallete");this.sceneSize={width:window.innerWidth,height:window.innerHeight-n.clientHeight},this.cellSize=i/e<ie?i/e:ie,this.maxScale=ie/this.cellSize,this.containerSize=this.cellSize*e,this.pivot=this.cellSize*e/2,this.coordinatesRects=ht(e,this.cellSize),this.position={x:this.sceneSize.width/2,y:this.sceneSize.height/2}}normalizeContainerPosition(){const e={x:0,y:0},i={x:this.sceneSize.width,y:this.sceneSize.height},n=this.containerSize*this.scale/2,o=Math.round(this.position.x-n),l=Math.round(this.position.x+n),a=Math.round(this.position.y-n),u=Math.round(this.position.y+n);let S=this.position.x,f=this.position.y;this.containerSize*this.scale>this.sceneSize.width?(o>e.x&&(S-=o),l<i.x&&(S+=i.x-l)):S=this.sceneSize.width/2,this.containerSize*this.scale>this.sceneSize.height?(a>e.y&&(f-=a),u<i.y&&(f+=i.y-u)):f=this.sceneSize.height/2,this.setPosition({x:S,y:f})}}w=_(null),h(w,1,"setPosition",Me,k),h(w,1,"startSettings",je,k),h(w,5,"scale",Ee,k),h(w,5,"position",Ie,k),R(w,k);const s=new k;function ft(t){const i=Math.round(255-t/100*2.5*255);return"#"+i.toString(16)+i.toString(16)+i.toString(16)}const ut=y.memo(t=>c.jsx(G.Text,{text:t.text,x:t.x,y:t.y,anchor:.5,eventMode:"none",style:new et({fill:"#333",fontSize:18,fontFamily:"pixel"})})),pe=t=>t instanceof HTMLCanvasElement;var Fe,ke,Le,$e,I;$e=[m],Le=[m],ke=[m],Fe=[m];class L{constructor(){C(I,5,this);x(this,"_isScale",!1);x(this,"_initialDiffFingers",0);D(this)}offsetScale(e,i,n){const o=(s.containerSize*i-s.containerSize*e)/2,l=(n.x-s.position.x)*100/(s.containerSize*e/2),a=(n.y-s.position.y)*100/(s.containerSize*e/2),u=o*l/100,S=o*a/100;s.setPosition({x:s.position.x-u,y:s.position.y-S})}wheelScale(e){if(!pe(e.target))return;const i=.2;let n=0;e.deltaY<0&&s.scale>1&&(n=-(s.scale*i)),e.deltaY>0&&s.scale<s.maxScale&&(n=s.scale*i);const o=s.scale+n<1?1:s.scale+n;Number(o.toFixed(2))!==s.scale&&(this.offsetScale(s.scale,o,{x:e.clientX,y:e.clientY}),s.scale=Number(o.toFixed(2)),s.normalizeContainerPosition())}onScaleStart(e){pe(e.target)&&e.touches.length===2&&(this._isScale=!0,this._initialDiffFingers=Math.hypot(e.touches[1].clientX-e.touches[0].clientX,e.touches[1].clientY-e.touches[0].clientY))}onScaleMove(e){if(!this._isScale)return;const i=.05;let n=0;const o=Math.hypot(e.touches[1].clientX-e.touches[0].clientX,e.touches[1].clientY-e.touches[0].clientY),l={x:(e.touches[0].clientX+e.touches[1].clientX)/2,y:(e.touches[0].clientY+e.touches[1].clientY)/2};if(this._initialDiffFingers<o&&s.scale<s.maxScale)n=i;else if(this._initialDiffFingers>o&&s.scale>1)n=-i;else return;const a=s.scale+n;Number(a.toFixed(2))!==s.scale&&(this.offsetScale(s.scale,a,{x:l.x,y:l.y}),s.scale=Number(a.toFixed(2))),this._initialDiffFingers=o}onScaleEnd(){this._isScale=!1,s.normalizeContainerPosition()}}I=_(null),h(I,1,"wheelScale",$e,L),h(I,1,"onScaleStart",Le,L),h(I,1,"onScaleMove",ke,L),h(I,1,"onScaleEnd",Fe,L),R(I,L);const N=new L;var De,Ye,Te,X;Te=[m],Ye=[m],De=[m];class O{constructor(){C(X,5,this);x(this,"_isMove",!1);x(this,"_initialPoint",{x:0,y:0});D(this)}onMovePointerStart(e){this._isMove=!0,this._initialPoint={x:e.clientX,y:e.clientY}}onMovePointer(e){if(!this._isMove)return;Math.hypot(this._initialPoint.x-e.clientX,this._initialPoint.y-e.clientY)>15&&(g.isClick=!1,g.isMove=!0,s.setPosition({x:s.position.x-(this._initialPoint.x-e.clientX),y:s.position.y-(this._initialPoint.y-e.clientY)}),this._initialPoint={x:e.clientX,y:e.clientY})}onMovePointerEnd(){this._isMove=!1,s.normalizeContainerPosition()}}X=_(null),h(X,1,"onMovePointerStart",Te,O),h(X,1,"onMovePointer",Ye,O),h(X,1,"onMovePointerEnd",De,O),R(X,O);const A=new O;var Xe,Ne,Oe,Be,z;Be=[H],Oe=[H],Ne=[m],Xe=[m];class ${constructor(){C(z,5,this);x(this,"selectedColor",C(z,8,this,"")),C(z,11,this);x(this,"isClear",C(z,12,this,!1)),C(z,15,this)}setSelectedColor(e){this.isClear&&(this.isClear=!1),this.selectedColor=e}clearColor(){this.isClear||(this.isClear=!0)}}z=_(null),h(z,1,"setSelectedColor",Ne,$),h(z,1,"clearColor",Xe,$),h(z,5,"selectedColor",Be,$),h(z,5,"isClear",Oe,$),R(z,$);const j=new $;var He,se;He=[m];class re{constructor(){C(se,5,this);x(this,"_isMove",!1);x(this,"_isScale",!1);x(this,"_isClick",!0);D(this),document.addEventListener("wheel",e=>N.wheelScale(e)),document.addEventListener("pointerdown",e=>{A.onMovePointerStart(e),document.addEventListener("pointermove",this.moveHandler.bind(this),!1),document.addEventListener("pointerup",()=>{A.onMovePointerEnd(),this._isMove=!1,this._isClick=!0,document.removeEventListener("pointermove",this.moveHandler.bind(this),!1)})}),document.addEventListener("touchstart",e=>{e.touches.length>1&&!this._isMove&&(this._isScale=!0,this._isClick=!1,N.onScaleStart(e),document.addEventListener("touchmove",i=>{N.onScaleMove(i)}),document.addEventListener("touchend",()=>{N.onScaleEnd(),this._isScale=!1}))})}handleFilling(e){if(this._isClick=!1,j.isClear){q.clearRect(e),this._isClick=!0;return}return q.addRect(e,j.selectedColor),this._isClick=!0,j.selectedColor}moveHandler(e){this._isScale||A.onMovePointer(e)}get isMove(){return this._isMove}set isMove(e){this._isMove=e}get isScale(){return this._isScale}get isClick(){return this._isClick}set isClick(e){this._isClick=e}}se=_(null),h(se,1,"handleFilling",He,re),R(se,re);const g=new re,xt=K(t=>{y.useMemo(()=>new Ge(0),[]);const e=r.data.rects[t.index],i=t.indexColor!==void 0?ft(t.indexColor+1):"#fff",[n,o]=y.useState(t.fill?t.fill:i),[l,a]=y.useState(e&&e.currentColorIndex===e.indexColor||n===i?1:.5),u=y.useCallback(()=>{const f=g.handleFilling(t.index);o(f||i),a(r.getColorIndex(t.index)===r.getCurrentColorIndex(t.index)&&r.getColorIndex(t.index)!==void 0||!f?1:.5)},[t.index,i]),S=y.useCallback(f=>{f.clear(),f.beginFill(n),f.lineStyle(1,"#e5e5e5",.5),f.drawRect(t.x,t.y,t.cellSize,t.cellSize),f.endFill()},[t,n]);return c.jsxs(c.Fragment,{children:[c.jsx(G.Graphics,{draw:S,interactive:!0,alpha:l,ontap:f=>{!g.isMove&&!g.isScale&&g.isClick&&(f.stopPropagation(),u())},onclick:f=>{!g.isMove&&!g.isScale&&g.isClick&&(f.stopPropagation(),u())}}),t.indexColor!==void 0&&n!==r.getColorRect(t.index)&&c.jsx(ut,{x:t.x+t.cellSize/2,y:t.y+t.cellSize/2,text:(t.indexColor+1).toString()})]})}),mt=K(t=>{y.useMemo(()=>new Ge(0),[]);const e="#fff",[i,n]=y.useState(t.fill?t.fill:e),o=y.useCallback(()=>{if(!g.isMove&&!g.isScale&&g.isClick){const a=g.handleFilling(t.index);n(a||e)}},[t.index,e]),l=y.useCallback(a=>{a.clear(),a.beginFill(i),a.lineStyle(.5,"#e5e5e5",.5),a.drawRect(t.x,t.y,t.cellSize,t.cellSize),a.endFill()},[t,i]);return c.jsx(G.Graphics,{draw:l,interactive:!0,eventMode:"dynamic",ontap:o,onclick:o,visible:!(s.scale===1&&i===e)})}),Ct=K(t=>c.jsx(c.Fragment,{children:s.coordinatesRects.map((e,i)=>r.data.isColoring?c.jsx(xt,{index:i,x:e.x,y:e.y,cellSize:s.cellSize,indexColor:r.getColorIndex(i),fill:r.getCurrentColor(i)},i):c.jsx(mt,{index:i,x:e.x,y:e.y,cellSize:s.cellSize,fill:t.rects&&r.getColorRect(i)},i))})),oe=K(t=>{const e=tt({query:"(orientation: landscape)"});return y.useEffect(()=>{s.startSettings(t.grid)},[e]),c.jsx(rt,{children:c.jsx(G.Stage,{width:s.sceneSize.width,height:s.sceneSize.height,options:{backgroundColor:15066597},children:c.jsx(G.Container,{interactive:!0,pivot:s.pivot,position:[s.position.x,s.position.y],scale:s.scale,children:c.jsx(Ct,{rects:t.rects})})})})}),gt=W.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #b3b0b0;

  & ul {
    display: flex;
    gap: 15px;
    margin: 0;
    padding: 0;
    font-size: 1em;
    list-style: none;
    overflow-x: auto;
  }

  @media (orientation: landscape) {
    padding: 5px;
  }
`,pt=t=>{j.setSelectedColor(t)},yt=()=>{j.clearColor()},ye=y.memo(t=>(j.setSelectedColor(t.colors[0]),c.jsx(gt,{id:"pallete",children:c.jsxs("ul",{children:[c.jsx(ge,{onClick:()=>yt()}),t.colors.map((e,i)=>c.jsx("li",{children:c.jsx(ge,{$color:e,onClick:()=>pt(e),children:i+1})},i+1))]})})));var B=(t=>(t[t.NEW_EDIT=0]="NEW_EDIT",t[t.EDIT=1]="EDIT",t[t.COLORING=2]="COLORING",t))(B||{});const ne=["#00FF00","#FFFF00","#000000"],St=({state:t})=>{let e,i=c.jsx(ye,{colors:ne});switch(t){case B.NEW_EDIT:q.createCanvas(30),r.setPallete(ne),e=c.jsx(oe,{grid:30});break;case B.EDIT:Ce(ot),e=c.jsx(oe,{grid:r.data.grid,rects:r.data.rects});break;case B.COLORING:Ce(nt),e=c.jsx(oe,{grid:r.data.grid,rects:r.data.rects,isColoring:r.data.isColoring}),i=c.jsx(ye,{colors:r.data.pallete&&r.data.pallete.length>0?r.data.pallete:ne});break}return c.jsx(dt,{editor:e,pallete:i})},bt=Ve`
  * {
    box-sizing: border-box;
  }

  body {
    position: relative;
    min-width: 375px;
    color: #333;
    font-family: 'pixel', sans-serif;
    font-size: 14px;
    line-height: 100%;
    background-color: #e5e5e5;
  }

  img {
    width: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  @media (min-width: 768px) {
    body {
      font-size: 16px;
    }
  }
`,vt=()=>c.jsxs(c.Fragment,{children:[c.jsx(bt,{}),c.jsx(St,{state:B.NEW_EDIT})]}),wt={colorStore:j,coloringStore:r,editorSettingsStore:s,scaleStore:N,movingStore:A,handlerStore:g};Ue.createRoot(document.getElementById("root")).render(c.jsx(Je.StrictMode,{children:c.jsx(it,{...wt,children:c.jsx(vt,{})})}));
