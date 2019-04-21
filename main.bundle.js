!function(t){var e={};function i(s){if(e[s])return e[s].exports;var r=e[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(s,r,function(e){return t[e]}.bind(null,r));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);var s=class{constructor(t,e,i,s){this.tour=t,this.tempTour=e,this.running=!1,this.ui=i,this.canvas=s}setupTour(t){this.tour.vertices=[...t],this.tour.updateTourProperties(),this.canvas.drawTour(this.tour.vertices,this.tour.edges),this.ui.displayTotalDistance(this.tour.totalDistance),this.ui.displayGeneration(0),this.tempTour.resetTour()}runSimulation(){this.running||(this.running=!0,this.twoOpt())}stopSimulation(){this.running=!1}twoOptSwap(t,e){for(let e=0;e<t;e++)this.tempTour.vertices[e]=this.tour.vertices[e];let i=0;for(let s=t;s<=e;s++)this.tempTour.vertices[s]=this.tour.vertices[e-i],i++;for(let t=e+1;t<this.tour.vertices.length;t++)this.tempTour.vertices[t]=this.tour.vertices[t];this.tempTour.updateTourProperties()}async twoOpt(){let t=!0,e=0;this.ui.displayGeneration(e),this.ui.displayStatus(!0);const i=this.tour.vertices.length;for(;t&&this.running;){t=!1,e++;for(let s=1;s<i-1&&this.running;s++)for(let r=s+1;r<i&&this.running;r++)if(this.twoOptSwap(s,r),this.ui.displayGeneration(e),this.tempTour.totalDistance<this.tour.totalDistance){t=!0;for(let t=0;t<i;t++)this.tour.vertices[t]=this.tempTour.vertices[t];this.tour.updateTourProperties(),this.ui.displayTotalDistance(this.tour.totalDistance),await this.canvas.drawTour(this.tour.vertices,this.tour.edges)}}this.ui.displayStatus(!1),this.running=!1}};const r=t=>{if(!Array.isArray(t))throw"Vertices must be an array";t.every(t=>{n(t)})},n=t=>{if("object"!=typeof t)throw"Vertex must be an object";if(!("x"in t&&"y"in t))throw"Vertex must contain x and y";if("number"!=typeof t.x||"number"!=typeof t.y)throw"Vertex x and y must be numbers"};var o=class{constructor(t){this.canvas=t.getElementById("my-canvas"),this.ctx=this.canvas.getContext("2d"),this.ctx.lineWidth=1,this.vertexSize=10,this.fillStyle="rgb(209, 127, 46)",this.ctx.strokeStyle="white",this.delay=0}drawVertices(t){let e,i;r(t),this.ctx.fillStyle="white",e=t[0].x-this.vertexSize/2,i=t[0].y-this.vertexSize/2,this.ctx.fillRect(e,i,this.vertexSize,this.vertexSize),this.ctx.rect(e,i,this.vertexSize,this.vertexSize),this.ctx.fillStyle=this.fillStyle;for(let s=1;s<t.length;s++)e=t[s].x-this.vertexSize/2,i=t[s].y-this.vertexSize/2,this.ctx.beginPath(),this.ctx.fillRect(e,i,this.vertexSize,this.vertexSize),this.ctx.rect(e,i,this.vertexSize,this.vertexSize),this.ctx.stroke(),this.ctx.closePath()}drawEdgesBetweenVertices(t,e){n(t),n(e),this.ctx.beginPath(),this.ctx.moveTo(t.x,t.y),this.ctx.lineTo(e.x,e.y),this.ctx.stroke(),this.ctx.closePath()}drawTour(t,e){return new Promise((i,s)=>{setTimeout(()=>{this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);for(let t=0;t<e.length;t++)this.drawEdgesBetweenVertices(e[t].v1,e[t].v2);this.drawVertices(t),i()},this.delay)})}setDelay(t){if(t<0||"number"!=typeof t)throw"Delay must be a positive number";this.delay=t}};var a=class{constructor(t){this.totalDistance=t.getElementById("total-distance"),this.generation=t.getElementById("generation"),this.status=t.getElementById("status")}displayTotalDistance(t){if("number"!=typeof t)throw"Distance must be a number";this.totalDistance.innerText=t.toFixed(2).toString()}displayGeneration(t){if("number"!=typeof t)throw"Generation must be a number";this.generation.innerText=t.toString()}displayStatus(t){if("boolean"!=typeof t)throw"Running must be a boolean";t?(this.status.innerText="Running",this.status.className="green"):(this.status.innerText="Not running",this.status.className="red")}};var u=class{constructor(){this.totalDistance=0,this.vertices=[],this.edges=[]}resetTour(){this.totalDistance=0,this.vertices=[],this.edges=[]}calculateEdgeLength(t){const e=Math.pow(t.v1.x-t.v2.x,2),i=Math.pow(t.v1.y-t.v2.y,2);return Number(Math.sqrt(e+i).toFixed(2))}updateTourProperties(){let t=[],e=0;for(let i=0;i<this.vertices.length;i++)i<this.vertices.length-1?(t.push({v1:this.vertices[i],v2:this.vertices[i+1]}),e+=this.calculateEdgeLength({v1:this.vertices[i],v2:this.vertices[i+1]})):(t.push({v1:this.vertices[i],v2:this.vertices[0]}),e+=this.calculateEdgeLength({v1:this.vertices[i],v2:this.vertices[0]}));this.edges=t,this.totalDistance=e}};const l=t=>{const e=new FileReader;return new Promise((i,s)=>{e.onerror=(()=>{e.abort(),s(new DOMException("Problem parsing input file."))}),e.onload=(()=>{i(e.result)}),e.readAsText(t)})};var c=(t,e,i)=>{return{x:Math.ceil(t()*e),y:Math.ceil(t()*i)}},h=(t,e,i,s)=>{const r=[];for(let n=0;n<e;n++)r.push(t(Math.random,i,s));return r},d=async t=>{try{return(await l(t)).split("\n").map(t=>t.trim().split(" ")).map(t=>({x:Number(t[0]),y:Number(t[1])}))}catch(t){console.log(t)}};const v=t=>{const e=document.getElementById("user-file-label");t.addEventListener("change",i=>{t.files.length>0?e.innerHTML=i.target.value.split("\\").pop():e.innerHTML='<i class="fas fa-upload"></i> Upload .tsv File'})};var p=t=>{const e=h(c,20,800,800);t.setupTour(e)},m=t=>{document.getElementById("start-simulation").addEventListener("click",e=>t.runSimulation()),document.getElementById("stop-simulation").addEventListener("click",e=>t.stopSimulation())},y=t=>{document.getElementById("random-problem-form").addEventListener("submit",e=>{e.preventDefault(),t.stopSimulation();const i=document.getElementById("vertices").value,s=h(c,i,800,800);t.setupTour(s)})},f=t=>{const e=document.getElementById("user-file");v(e),document.getElementById("upload-problem").addEventListener("submit",async i=>{if(i.preventDefault(),e.files.length>0){let i=await d(e.files[0]);t.setupTour(i)}})},g=t=>{document.getElementById("set-delay-form").addEventListener("submit",e=>{e.preventDefault();const i=document.getElementById("delay").value;t.setDelay(Number(i))})};window.addEventListener("load",function(){const t=new u,e=new u,i=new o(window.document),r=new a(window.document),n=new s(t,e,r,i);p(n),m(n),y(n),f(n),g(i)})}]);