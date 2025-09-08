function e(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let o=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new o(i,e,s)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,v=g.trustedTypes,f=v?v.emptyScript:"",m=g.reactiveElementPolyfillSupport,_=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},$=(e,t)=>!c(e,t),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&l(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:r}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const o=s?.call(this);r?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const e=this.properties,t=[...d(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=s;const o=r.fromAttribute(t,e.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){const s=this.constructor,r=this[e];if(i??=s.getPropertyOptions(e),!((i.hasChanged??$)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==r||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[_("elementProperties")]=new Map,x[_("finalized")]=new Map,m?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k=globalThis,w=k.trustedTypes,A=w?w.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+S,V=`<${C}>`,P=document,U=()=>P.createComment(""),M=e=>null===e||"object"!=typeof e&&"function"!=typeof e,O=Array.isArray,N="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,R=/>/g,z=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,D=/"/g,L=/^(?:script|style|textarea|title)$/i,j=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),B=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),F=new WeakMap,q=P.createTreeWalker(P,129);function G(e,t){if(!O(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}const J=(e,t)=>{const i=e.length-1,s=[];let r,o=2===t?"<svg>":3===t?"<math>":"",n=T;for(let t=0;t<i;t++){const i=e[t];let a,c,l=-1,h=0;for(;h<i.length&&(n.lastIndex=h,c=n.exec(i),null!==c);)h=n.lastIndex,n===T?"!--"===c[1]?n=H:void 0!==c[1]?n=R:void 0!==c[2]?(L.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=z):void 0!==c[3]&&(n=z):n===z?">"===c[0]?(n=r??T,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?z:'"'===c[3]?D:I):n===D||n===I?n=z:n===H||n===R?n=T:(n=z,r=void 0);const d=n===z&&e[t+1].startsWith("/>")?" ":"";o+=n===T?i+V:l>=0?(s.push(a),i.slice(0,l)+E+i.slice(l)+S+d):i+S+(-2===l?t:d)}return[G(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class K{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,o=0;const n=e.length-1,a=this.parts,[c,l]=J(e,t);if(this.el=K.createElement(c,i),q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=q.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(E)){const t=l[o++],i=s.getAttribute(e).split(S),n=/([.?@])?(.*)/.exec(t);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?ee:"?"===n[1]?te:"@"===n[1]?ie:X}),s.removeAttribute(e)}else e.startsWith(S)&&(a.push({type:6,index:r}),s.removeAttribute(e));if(L.test(s.tagName)){const e=s.textContent.split(S),t=e.length-1;if(t>0){s.textContent=w?w.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],U()),q.nextNode(),a.push({type:2,index:++r});s.append(e[t],U())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:r});else{let e=-1;for(;-1!==(e=s.data.indexOf(S,e+1));)a.push({type:7,index:r}),e+=S.length-1}r++}}static createElement(e,t){const i=P.createElement("template");return i.innerHTML=e,i}}function Z(e,t,i=e,s){if(t===B)return t;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=M(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(e),r._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(t=Z(e,r._$AS(e,t.values),r,s)),t}class Y{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??P).importNode(t,!0);q.currentNode=s;let r=q.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let t;2===a.type?t=new Q(r,r.nextSibling,this,e):1===a.type?t=new a.ctor(r,a.name,a.strings,this,e):6===a.type&&(t=new se(r,this,e)),this._$AV.push(t),a=i[++n]}o!==a?.index&&(r=q.nextNode(),o++)}return q.currentNode=P,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),M(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==B&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>O(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&M(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=K.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new Y(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=F.get(e.strings);return void 0===t&&F.set(e.strings,t=new K(e)),t}k(e){O(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const r of e)s===t.length?t.push(i=new Q(this.O(U()),this.O(U()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,r){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,s){const r=this.strings;let o=!1;if(void 0===r)e=Z(this,e,t,0),o=!M(e)||e!==this._$AH&&e!==B,o&&(this._$AH=e);else{const s=e;let n,a;for(e=r[0],n=0;n<r.length-1;n++)a=Z(this,s[i+n],t,n),a===B&&(a=this._$AH[n]),o||=!M(a)||a!==this._$AH[n],a===W?e=W:e!==W&&(e+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ee extends X{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class te extends X{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class ie extends X{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??W)===B)return;const i=this._$AH,s=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const re=k.litHtmlPolyfillSupport;re?.(K,Q),(k.litHtmlVersions??=[]).push("3.3.1");const oe=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ne extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let r=s._$litPart$;if(void 0===r){const e=i?.renderBefore??null;s._$litPart$=r=new Q(t.insertBefore(U(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}ne._$litElement$=!0,ne.finalized=!0,oe.litElementHydrateSupport?.({LitElement:ne});const ae=oe.litElementPolyfillSupport;ae?.({LitElement:ne}),(oe.litElementVersions??=[]).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},le={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:$},he=(e=le,t,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const r=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,r,e)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];t.call(this,i),this.requestUpdate(s,r,e)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function de(e){return(t,i)=>"object"==typeof i?he(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pe(e){return de({...e,state:!0,attribute:!1})}function ue(e){const t=[],i=new Map;return Object.values(e.states).forEach(e=>{const t=e.entity_id.split(".");if(t.length>=2){const s=`${t[0]}.${t[1]}`;i.has(s)||i.set(s,[]),i.get(s).push(e)}}),i.forEach((e,i)=>{const s=function(e,t){const i=new Map;t.forEach(e=>{i.set(e.entity_id,e)});const s=function(e){const t=e.some(e=>e.entity_id.includes("battery")||e.entity_id.includes("charging")),i=e.some(e=>e.entity_id.includes("fuel")||e.entity_id.includes("remaining_fuel"));return t&&i?"phev":t?"ev":"ice"}(t),r=function(e,t){const i=ge(e,["device_tracker"]);if(i&&i.attributes.friendly_name)return i.attributes.friendly_name;const s=t.split(".");if(s.length>=2)return s[1].replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase());return t}(t,e),o={deviceId:e,name:r,kind:s},n=ge(t,["remaining_fuel"]),a=ge(t,["remaining_fuel_percent"]);n&&(o.fuel_l=n.state);a&&(o.fuel_percent=a.state);const c=ge(t,["remaining_range_fuel"]),l=ge(t,["remaining_range_total"]),h=ge(t,["range_electric","remaining_range_electric"]);c?o.range_km=c.state:l&&(o.range_km=l.state);h&&(o.range_elec_km=h.state);if("ev"===s||"phev"===s){const e=ge(t,["battery","remaining_battery_percent","charging_level_percent"]),i=ge(t,["charging_state","charging_status"]);e&&(o.battery_percent=e.state),i&&(o.charging_state=i.state)}const d=ge(t,["mileage"]);d&&(o.odometer_km=d.state);const p=ge(t,["lock"]);p&&(o.lock=p.state);const u=ge(t,["windows"]),g=ge(t,["lids"]);u&&(o.windows_open=u.state);g&&(o.lids_open=g.state);const v=ge(t,["flash_lights"]),f=ge(t,["sound_horn"]),m=ge(t,["activate_air_conditioning","climate"]),_=ge(t,["find_vehicle"]);v&&(o.flash_btn=v.entity_id);f&&(o.horn_btn=f.entity_id);m&&(o.vent_btn=m.entity_id);_&&(o.find_btn=_.entity_id);const b=ge(t,["device_tracker"]);b&&(o.tracker=b.entity_id);return o}(i,e);s&&t.push(s)}),t}function ge(e,t){for(const i of e)for(const e of t)if(i.entity_id.includes(e))return i;return null}function ve(e,t,i){const s=parseFloat(e);return isNaN(s)?e:"km"===t&&"mi"===i?(.621371*s).toFixed(1):"mi"===t&&"km"===i?(1.60934*s).toFixed(1):"L"===t&&"gal"===i?(.264172*s).toFixed(2):"gal"===t&&"L"===i?(3.78541*s).toFixed(2):"L/100km"===t&&"mpg"===i||"mpg"===t&&"L/100km"===i?(235.214/s).toFixed(1):e}function fe(e,t){if(!t)return e;switch(e){case"km":return"mi";case"L":return"gal";case"L/100km":return"mpg";default:return e}}let me=class extends ne{constructor(){super(...arguments),this.vehicles=[],this.selectedVehicle=null,this.showDetails=!1}static get styles(){return n`
      :host {
        display: block;
        padding: 16px;
        background: var(--card-background-color, #fff);
        border-radius: var(--border-radius, 8px);
        box-shadow: var(--box-shadow, 0 2px 4px rgba(0,0,0,0.1));
        color: var(--primary-text-color, #000);
      }

      .card-header {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        gap: 12px;
      }

      .card-title {
        font-size: 1.2em;
        font-weight: 500;
        margin: 0;
        flex: 1;
      }

      .hero-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 16px;
        position: relative;
      }

      .hero-image-container {
        position: relative;
        width: 100%;
        height: 200px;
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 16px;
      }

      .hero-image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .hero-image-overlay .vehicle-name {
        color: white;
        font-size: 1.5em;
        font-weight: 600;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
        text-align: center;
      }

      .status-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 12px;
        margin-bottom: 16px;
      }

      .status-tile {
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 12px;
        padding: 16px;
        text-align: center;
        border: 1px solid var(--divider-color, #e0e0e0);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      .status-tile:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
      }

      .status-tile .icon {
        font-size: 1.5em;
        margin-bottom: 4px;
        color: var(--accent-color, #03a9f4);
      }

      .status-tile .value {
        font-size: 1.1em;
        font-weight: 500;
        margin-bottom: 2px;
      }

      .status-tile .unit {
        font-size: 0.9em;
        color: var(--secondary-text-color, #666);
      }

      .actions-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
      }

      .action-chip {
        background: var(--accent-color, #03a9f4);
        color: white;
        border: none;
        border-radius: 16px;
        padding: 8px 16px;
        font-size: 0.9em;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .action-chip:hover {
        background: var(--accent-color-dark, #0288d1);
      }

      .action-chip:disabled {
        background: var(--disabled-color, #ccc);
        cursor: not-allowed;
      }

      .details-toggle {
        background: none;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 4px;
        padding: 8px 16px;
        cursor: pointer;
        color: var(--primary-text-color, #000);
        margin-bottom: 16px;
      }

      .details-toggle:hover {
        background: var(--secondary-background-color, #f5f5f5);
      }

      .details-content {
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        padding: 12px;
        margin-top: 8px;
      }

      .details-content.hidden {
        display: none;
      }

      .details-item {
        display: flex;
        justify-content: space-between;
        padding: 4px 0;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }

      .details-item:last-child {
        border-bottom: none;
      }

      .details-label {
        font-weight: 500;
      }

      .details-value {
        color: var(--secondary-text-color, #666);
      }

      .charging-indicator {
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
      }

      .progress-bar-container {
        position: relative;
        width: 100%;
        height: 4px;
        background: var(--divider-color, #e0e0e0);
        border-radius: 2px;
        margin: 8px 0;
        overflow: hidden;
      }

      .progress-bar {
        height: 100%;
        background: linear-gradient(90deg, var(--accent-color, #03a9f4), var(--accent-color-dark, #0288d1));
        border-radius: 2px;
        transition: width 0.3s ease;
        position: relative;
      }

      .progress-bar.charging {
        background: linear-gradient(90deg, #4caf50, #2e7d32);
        animation: progressPulse 2s infinite;
      }

      @keyframes progressPulse {
        0% { box-shadow: 0 0 0 rgba(76, 175, 80, 0.4); }
        50% { box-shadow: 0 0 10px rgba(76, 175, 80, 0.8); }
        100% { box-shadow: 0 0 0 rgba(76, 175, 80, 0.4); }
      }

      .battery-icon.charging {
        animation: batteryPulse 2s infinite;
        color: #4caf50;
      }

      @keyframes batteryPulse {
        0% { 
          color: var(--accent-color, #03a9f4);
          box-shadow: 0 0 0 rgba(76, 175, 80, 0.4);
        }
        50% { 
          color: #4caf50;
          box-shadow: 0 0 8px rgba(76, 175, 80, 0.8);
        }
        100% { 
          color: var(--accent-color, #03a9f4);
          box-shadow: 0 0 0 rgba(76, 175, 80, 0.4);
        }
      }

      .error-message {
        color: var(--error-color, #f44336);
        text-align: center;
        padding: 20px;
      }
    `}connectedCallback(){super.connectedCallback(),this.discoverVehicles()}updated(e){super.updated(e),(e.has("hass")||e.has("config"))&&this.discoverVehicles()}discoverVehicles(){this.hass&&(this.vehicles=ue(this.hass),this.config.device_id?this.selectedVehicle=this.vehicles.find(e=>e.deviceId===this.config.device_id)||null:this.selectedVehicle=this.vehicles[0]||null)}async callService(e){if(!this.hass)return;const[t]=e.split(".");await this.hass.callService(t,"press",{entity_id:e})}toggleDetails(){this.showDetails=!this.showDetails}getStatusTiles(){if(!this.selectedVehicle)return[];const e=[],t=this.config.prefer_imperial||!1;if("ice"!==this.selectedVehicle.kind&&"phev"!==this.selectedVehicle.kind||this.selectedVehicle.fuel_percent&&e.push(j`
          <div class="status-tile">
            <div class="icon">⛽</div>
            <div class="value">${this.selectedVehicle.fuel_percent}%</div>
            <div class="unit">Fuel</div>
          </div>
        `),"ev"===this.selectedVehicle.kind||"phev"===this.selectedVehicle.kind){const t="charging"===this.selectedVehicle.charging_state||"on"===this.selectedVehicle.charging_state,i=t?"battery-icon charging":"battery-icon";e.push(j`
        <div class="status-tile">
          <div class="icon ${i}">🔋</div>
          <div class="value">${this.selectedVehicle.battery_percent||"N/A"}%</div>
          <div class="unit">Battery ${t?"(Charging)":""}</div>
        </div>
      `)}if(this.selectedVehicle.range_km){const i=t?ve(this.selectedVehicle.range_km,"km","mi"):this.selectedVehicle.range_km,s=t?"mi":"km";e.push(j`
        <div class="status-tile">
          <div class="icon">📏</div>
          <div class="value">${i}</div>
          <div class="unit">Range (${s})</div>
        </div>
      `)}if(this.selectedVehicle.odometer_km){const i=t?ve(this.selectedVehicle.odometer_km,"km","mi"):this.selectedVehicle.odometer_km,s=t?"mi":"km";e.push(j`
        <div class="status-tile">
          <div class="icon">🛣️</div>
          <div class="value">${i}</div>
          <div class="unit">Odometer (${s})</div>
        </div>
      `)}return e}getActionChips(){if(!this.selectedVehicle)return[];const e=[];if(this.selectedVehicle.lock){const t="locked"===this.selectedVehicle.lock;e.push(j`
        <button 
          class="action-chip" 
          @click=${()=>this.callService(this.selectedVehicle.lock)}
        >
          ${t?"🔓 Unlock":"🔒 Lock"}
        </button>
      `)}return this.selectedVehicle.flash_btn&&e.push(j`
        <button 
          class="action-chip" 
          @click=${()=>this.callService(this.selectedVehicle.flash_btn)}
        >
          💡 Flash
        </button>
      `),this.selectedVehicle.horn_btn&&e.push(j`
        <button 
          class="action-chip" 
          @click=${()=>this.callService(this.selectedVehicle.horn_btn)}
        >
          📢 Horn
        </button>
      `),this.selectedVehicle.vent_btn&&e.push(j`
        <button 
          class="action-chip" 
          @click=${()=>this.callService(this.selectedVehicle.vent_btn)}
        >
          🌬️ Vent
        </button>
      `),this.selectedVehicle.find_btn&&e.push(j`
        <button 
          class="action-chip" 
          @click=${()=>this.callService(this.selectedVehicle.find_btn)}
        >
          📍 Find
        </button>
      `),e}getProgressBars(){if(!this.selectedVehicle)return j``;const e=[];if(("ev"===this.selectedVehicle.kind||"phev"===this.selectedVehicle.kind)&&this.selectedVehicle.battery_percent){const t=parseFloat(this.selectedVehicle.battery_percent),i="charging"===this.selectedVehicle.charging_state;e.push(j`
        <div class="progress-bar-container">
          <div class="progress-bar ${i?"charging":""}" style="width: ${t}%"></div>
        </div>
      `)}if(("ice"===this.selectedVehicle.kind||"phev"===this.selectedVehicle.kind)&&this.selectedVehicle.fuel_percent){const t=parseFloat(this.selectedVehicle.fuel_percent);e.push(j`
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${t}%"></div>
        </div>
      `)}return j`${e}`}getDetailsContent(){if(!this.selectedVehicle)return j``;const e=this.config.prefer_imperial||!1;return j`
      <div class="details-item">
        <span class="details-label">Vehicle Type:</span>
        <span class="details-value">${this.selectedVehicle.kind.toUpperCase()}</span>
      </div>
      
      ${this.selectedVehicle.fuel_l?j`
        <div class="details-item">
          <span class="details-label">Fuel Level:</span>
          <span class="details-value">
            ${this.selectedVehicle.fuel_l}L 
            ${e?`(${ve(this.selectedVehicle.fuel_l,"L","gal")} gal)`:""}
          </span>
        </div>
      `:""}
      
      ${this.selectedVehicle.range_elec_km?j`
        <div class="details-item">
          <span class="details-label">Electric Range:</span>
          <span class="details-value">
            ${e?ve(this.selectedVehicle.range_elec_km,"km","mi"):this.selectedVehicle.range_elec_km}
            ${e?"mi":"km"}
          </span>
        </div>
      `:""}
      
      ${this.selectedVehicle.windows_open?j`
        <div class="details-item">
          <span class="details-label">Windows:</span>
          <span class="details-value">${this.selectedVehicle.windows_open}</span>
        </div>
      `:""}
      
      ${this.selectedVehicle.lids_open?j`
        <div class="details-item">
          <span class="details-label">Lids:</span>
          <span class="details-value">${this.selectedVehicle.lids_open}</span>
        </div>
      `:""}
      
      ${this.selectedVehicle.tracker?j`
        <div class="details-item">
          <span class="details-label">Location:</span>
          <span class="details-value">${this.hass.states[this.selectedVehicle.tracker]?.state||"Unknown"}</span>
        </div>
      `:""}
    `}render(){return this.hass?this.selectedVehicle?j`
      <div class="card-header">
        <h2 class="card-title">${this.config.title||this.selectedVehicle.name}</h2>
      </div>

      ${this.config.image?j`
        <div class="hero-image-container">
          <img class="hero-image" src="${this.config.image}" alt="${this.selectedVehicle.name}" />
          <div class="hero-image-overlay">
            <div class="vehicle-name">${this.selectedVehicle.name}</div>
          </div>
        </div>
      `:""}

      <div class="status-row">
        ${this.getStatusTiles()}
      </div>

      ${this.getProgressBars()}

      <div class="actions-row">
        ${this.getActionChips()}
      </div>

      <button class="details-toggle" @click=${this.toggleDetails}>
        ${this.showDetails?"Hide":"Show"} Details
      </button>

      <div class="details-content ${this.showDetails?"":"hidden"}">
        ${this.getDetailsContent()}
      </div>
    `:j`<div class="error-message">No BMW/MINI vehicles found</div>`:j`<div class="error-message">Home Assistant not available</div>`}};e([de({attribute:!1})],me.prototype,"hass",void 0),e([de({attribute:!1})],me.prototype,"config",void 0),e([pe()],me.prototype,"vehicles",void 0),e([pe()],me.prototype,"selectedVehicle",void 0),e([pe()],me.prototype,"showDetails",void 0),me=e([ce("ha-vehicle-card")],me);let _e=class extends ne{constructor(){super(...arguments),this.vehicles=[]}static get styles(){return n`
      .card-config {
        padding: 16px;
      }

      .form-group {
        margin-bottom: 16px;
      }

      .form-group label {
        display: block;
        margin-bottom: 4px;
        font-weight: 500;
        color: var(--primary-text-color, #000);
      }

      .form-group input,
      .form-group select {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 4px;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color, #000);
        font-size: 14px;
      }

      .form-group input:focus,
      .form-group select:focus {
        outline: none;
        border-color: var(--accent-color, #03a9f4);
        box-shadow: 0 0 0 2px rgba(3, 169, 244, 0.2);
      }

      .form-group .checkbox-group {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .form-group input[type="checkbox"] {
        width: auto;
        margin: 0;
      }

      .form-group .help-text {
        font-size: 12px;
        color: var(--secondary-text-color, #666);
        margin-top: 4px;
      }

      .vehicle-preview {
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        padding: 12px;
        margin-top: 16px;
        border: 1px solid var(--divider-color, #e0e0e0);
      }

      .vehicle-preview h4 {
        margin: 0 0 8px 0;
        font-size: 14px;
        color: var(--primary-text-color, #000);
      }

      .vehicle-info {
        font-size: 12px;
        color: var(--secondary-text-color, #666);
      }

      .error-message {
        color: var(--error-color, #f44336);
        font-size: 12px;
        margin-top: 4px;
      }
    `}connectedCallback(){super.connectedCallback(),this.discoverVehicles()}discoverVehicles(){this.hass&&(this.vehicles=ue(this.hass))}_valueChanged(e){const t=e.target,i="checkbox"===t.type?t.checked:t.value,s=t.name;this.config||(this.config={type:"custom:ha-vehicle-card"});const r={...this.config};switch(s){case"title":r.title=i;break;case"image":r.image=i;break;case"device_id":r.device_id=i;break;case"prefer_imperial":r.prefer_imperial=i;break;case"tank_size_l":r.tank_size_l=parseFloat(i)||void 0}this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:r},bubbles:!0,composed:!0}))}getSelectedVehicle(){return this.config.device_id&&this.vehicles.find(e=>e.deviceId===this.config.device_id)||null}render(){if(!this.hass)return j`<div class="error-message">Home Assistant not available</div>`;const e=this.getSelectedVehicle();return j`
      <div class="card-config">
        <div class="form-group">
          <label for="title">Card Title</label>
          <input
            type="text"
            name="title"
            id="title"
            .value=${this.config.title||""}
            @input=${this._valueChanged}
            placeholder="Leave empty to use vehicle name"
          />
          <div class="help-text">Optional title for the card. If empty, the vehicle name will be used.</div>
        </div>

        <div class="form-group">
          <label for="image">Hero Image</label>
          <input
            type="text"
            name="image"
            id="image"
            .value=${this.config.image||""}
            @input=${this._valueChanged}
            placeholder="/local/bmw/x5-hero.png"
          />
          <div class="help-text">Optional path to a hero image (e.g., /local/bmw/x5-hero.png)</div>
        </div>

        <div class="form-group">
          <label for="device_id">Vehicle</label>
          <select
            name="device_id"
            id="device_id"
            .value=${this.config.device_id||""}
            @change=${this._valueChanged}
          >
            <option value="">Auto-detect (first vehicle)</option>
            ${this.vehicles.map(e=>j`
              <option value="${e.deviceId}">${e.name} (${e.kind.toUpperCase()})</option>
            `)}
          </select>
          <div class="help-text">Select a specific vehicle or leave empty to auto-detect.</div>
        </div>

        <div class="form-group">
          <div class="checkbox-group">
            <input
              type="checkbox"
              name="prefer_imperial"
              id="prefer_imperial"
              .checked=${this.config.prefer_imperial||!1}
              @change=${this._valueChanged}
            />
            <label for="prefer_imperial">Use Imperial Units</label>
          </div>
          <div class="help-text">Display miles, gallons, and MPG instead of kilometers, liters, and L/100km.</div>
        </div>

        <div class="form-group">
          <label for="tank_size_l">Tank Size (Liters)</label>
          <input
            type="number"
            name="tank_size_l"
            id="tank_size_l"
            .value=${this.config.tank_size_l||""}
            @input=${this._valueChanged}
            placeholder="70"
            step="0.1"
            min="0"
          />
          <div class="help-text">Tank size in liters. Used to calculate fuel percentage if not available from the vehicle.</div>
        </div>

        ${e?j`
          <div class="vehicle-preview">
            <h4>Selected Vehicle Preview</h4>
            <div class="vehicle-info">
              <strong>Name:</strong> ${e.name}<br>
              <strong>Type:</strong> ${e.kind.toUpperCase()}<br>
              <strong>Device ID:</strong> ${e.deviceId}<br>
              ${e.fuel_percent?j`<strong>Fuel:</strong> ${e.fuel_percent}%<br>`:""}
              ${e.battery_percent?j`<strong>Battery:</strong> ${e.battery_percent}%<br>`:""}
              ${e.range_km?j`<strong>Range:</strong> ${e.range_km} km<br>`:""}
              ${e.odometer_km?j`<strong>Odometer:</strong> ${e.odometer_km} km<br>`:""}
            </div>
          </div>
        `:""}

        ${0===this.vehicles.length?j`
          <div class="error-message">
            No BMW/MINI vehicles found. Make sure the BMW ConnectedDrive integration is installed and configured.
          </div>
        `:""}
      </div>
    `}};e([de({attribute:!1})],_e.prototype,"hass",void 0),e([de({attribute:!1})],_e.prototype,"config",void 0),e([pe()],_e.prototype,"vehicles",void 0),_e=e([ce("ha-vehicle-card-editor")],_e),customElements.define("ha-vehicle-card",me),customElements.define("ha-vehicle-card-editor",_e),window.customCards&&window.customCards.push({type:"custom:ha-vehicle-card",name:"BMW/MINI Vehicle Card",description:"Universal vehicle card for BMW/MINI vehicles with auto-discovery",preview:!0,documentationURL:"https://github.com/your-username/ha-vehicle-card"});const be={type:"custom:ha-vehicle-card",name:"BMW/MINI Vehicle Card",description:"Universal vehicle card for BMW/MINI vehicles with auto-discovery",preview:!0,documentationURL:"https://github.com/your-username/ha-vehicle-card",config:{title:{type:"string",description:"Card title (optional)",default:""},image:{type:"string",description:"Hero image path (optional)",default:""},device_id:{type:"string",description:"Specific vehicle device ID (optional)",default:""},prefer_imperial:{type:"boolean",description:"Use imperial units (miles, gallons, MPG)",default:!1},tank_size_l:{type:"number",description:"Tank size in liters for fuel percentage calculation",default:null}}},$e={type:"custom:ha-vehicle-card",title:"",image:"",device_id:"",prefer_imperial:!1,tank_size_l:void 0};export{be as cardConfigSchema,ve as convertUnits,$e as defaultConfig,ue as discoverVehicles,fe as getDisplayUnit};
//# sourceMappingURL=ha-vehicle-card.js.map
