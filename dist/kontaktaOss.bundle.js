(()=>{"use strict";var e={738:(e,t,n)=>{n.d(t,{A:()=>c});var o=n(1601),r=n.n(o),a=n(6314),i=n.n(a)()(r());i.push([e.id,'.kontakta-faq__accordion__block__answer{transition:max-height .25s ease-in}.kontakta-faq__accordion__block__question.open+.kontakta-faq__accordion__block__answer{max-height:200px}.open .kontakta-faq-arrow{transform:rotate(90deg)}.form-input__block:has(.invalid-mail){position:relative}.form-input__block:has(.invalid-mail):after{bottom:-25px;color:#fc5858;content:"e-post stämmer inte";position:absolute;right:0}',""]);const c=i},6314:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",o=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),o&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),o&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,o,r,a){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(o)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(i[s]=!0)}for(var u=0;u<e.length;u++){var l=[].concat(e[u]);o&&i[l[0]]||(void 0!==a&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=a),n&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=n):l[2]=n),r&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=r):l[4]="".concat(r)),t.push(l))}},t}},1601:e=>{e.exports=function(e){return e[1]}},5072:e=>{var t=[];function n(e){for(var n=-1,o=0;o<t.length;o++)if(t[o].identifier===e){n=o;break}return n}function o(e,o){for(var a={},i=[],c=0;c<e.length;c++){var s=e[c],u=o.base?s[0]+o.base:s[0],l=a[u]||0,d="".concat(u," ").concat(l);a[u]=l+1;var f=n(d),p={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==f)t[f].references++,t[f].updater(p);else{var m=r(p,o);o.byIndex=c,t.splice(c,0,{identifier:d,updater:m,references:1})}i.push(d)}return i}function r(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,r){var a=o(e=e||[],r=r||{});return function(e){e=e||[];for(var i=0;i<a.length;i++){var c=n(a[i]);t[c].references--}for(var s=o(e,r),u=0;u<a.length;u++){var l=n(a[u]);0===t[l].references&&(t[l].updater(),t.splice(l,1))}a=s}}},7659:e=>{var t={};e.exports=function(e,n){var o=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(n)}},540:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},5056:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},7825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var o="";n.supports&&(o+="@supports (".concat(n.supports,") {")),n.media&&(o+="@media ".concat(n.media," {"));var r=void 0!==n.layer;r&&(o+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),o+=n.css,r&&(o+="}"),n.media&&(o+="}"),n.supports&&(o+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(o,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},1113:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var a=t[o]={id:o,exports:{}};return e[o](a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0;var o=n(5072),r=n.n(o),a=n(7825),i=n.n(a),c=n(7659),s=n.n(c),u=n(5056),l=n.n(u),d=n(540),f=n.n(d),p=n(1113),m=n.n(p),v=n(738),h={};h.styleTagTransform=m(),h.setAttributes=l(),h.insert=s().bind(null,"head"),h.domAPI=i(),h.insertStyleElement=f(),r()(v.A,h),v.A&&v.A.locals&&v.A.locals,document.querySelectorAll(".kontakta-faq__accordion").forEach((e=>{let t=e.querySelectorAll(".kontakta-faq__accordion__block .kontakta-faq__accordion__block__question");t.forEach((e=>{e.addEventListener("click",(e=>{e.currentTarget.classList.contains("open")?e.currentTarget.classList.remove("open"):(t.forEach((e=>{e.classList.remove("open")})),e.currentTarget.classList.add("open"))}))}))}));const y=document.querySelector("#offer-submit .button-text"),_=document.querySelector("#offer-submit-button");function b(){y.textContent=_.value}function g(){const e=document.getElementById("e-post-field").value,t=document.getElementById("e-post-confirm").value,n=document.getElementById("offer-submit");if(""===t)return document.getElementById("e-post-confirm").classList.remove("invalid-mail"),void n.classList.remove("invalid-form");e!==t?(document.getElementById("e-post-confirm").classList.add("invalid-mail"),n.classList.add("invalid-form")):(document.getElementById("e-post-confirm").classList.remove("invalid-mail"),n.classList.remove("invalid-form"))}new MutationObserver(b).observe(_,{attributes:!0,attributeFilter:["value"]}),b(),g(),document.getElementById("e-post-confirm").addEventListener("input",g)})();