(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-09b2698c"],{"169a":function(t,e,i){"use strict";i("368e");var s=i("4ad4"),o=i("b848"),r=i("75eb"),a=i("e707"),n=i("e4d3"),l=i("21be"),c=i("f2e7"),d=i("a293"),h=i("80d2"),u=i("bfc5"),p=i("58df");const v=Object(p["a"])(s["a"],o["a"],r["a"],a["a"],n["a"],l["a"],c["a"]);e["a"]=v.extend({name:"v-dialog",directives:{ClickOutside:d["a"]},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,fullWidth:Boolean,light:Boolean,maxWidth:{type:[String,Number],default:"none"},noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:{type:[String,Number],default:"auto"}},data(){return{activatedBy:null,animate:!1,animateTimeout:-1,isActive:!!this.value,stackMinZIndex:200}},computed:{classes(){return{[`v-dialog ${this.contentClass}`.trim()]:!0,"v-dialog--active":this.isActive,"v-dialog--persistent":this.persistent,"v-dialog--fullscreen":this.fullscreen,"v-dialog--scrollable":this.scrollable,"v-dialog--animated":this.animate}},contentClasses(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive(t){t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind())},fullscreen(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},beforeMount(){this.$nextTick(()=>{this.isBooted=this.isActive,this.isActive&&this.show()})},beforeDestroy(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick(){this.animate=!1,this.$nextTick(()=>{this.animate=!0,window.clearTimeout(this.animateTimeout),this.animateTimeout=window.setTimeout(()=>this.animate=!1,150)})},closeConditional(t){const e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e))&&(this.$emit("click:outside"),this.persistent?(this.noClickAnimation||this.overlay!==e||this.animateClick(),!1):this.activeZIndex>=this.getMaxZIndex())},hideScroll(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):a["a"].options.methods.hideScroll.call(this)},show(){!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$refs.content.focus(),this.bind()},bind(){window.addEventListener("focusin",this.onFocusin)},unbind(){window.removeEventListener("focusin",this.onFocusin)},onKeydown(t){if(t.keyCode===h["w"].esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;const t=this.getActivator();this.$nextTick(()=>t&&t.focus())}this.$emit("keydown",t)},onFocusin(t){if(!t||!this.retainFocus)return;const e=t.target;if(e&&![document,this.$refs.content].includes(e)&&!this.$refs.content.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some(t=>t.contains(e))){const t=this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');t.length&&t[0].focus()}}},render(t){const e=[],i={class:this.classes,ref:"dialog",directives:[{name:"click-outside",value:()=>{this.isActive=!1},args:{closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],on:{click:t=>{t.stopPropagation()}},style:{}};this.fullscreen||(i.style={maxWidth:"none"===this.maxWidth?void 0:Object(h["f"])(this.maxWidth),width:"auto"===this.width?void 0:Object(h["f"])(this.width)}),e.push(this.genActivator());let s=t("div",i,this.showLazyContent(this.getContentSlot()));return this.transition&&(s=t("transition",{props:{name:this.transition,origin:this.origin}},[s])),e.push(t("div",{class:this.contentClasses,attrs:{role:"document",tabindex:0,...this.getScopeIdAttrs()},on:{keydown:this.onKeydown},style:{zIndex:this.activeZIndex},ref:"content"},[this.$createElement(u["a"],{props:{root:!0,light:this.light,dark:this.dark}},[s])])),t("div",{staticClass:"v-dialog__container",attrs:{role:"dialog"},style:{display:!this.hasActivator||this.fullWidth?"block":"inline-block"}},e)}})},"2a7f":function(t,e,i){"use strict";i.d(e,"a",function(){return a}),i.d(e,"b",function(){return r});var s=i("71d9"),o=i("80d2");const r=Object(o["h"])("v-toolbar__title"),a=Object(o["h"])("v-toolbar__items");s["a"]},"2fa4":function(t,e,i){"use strict";i("20f6");var s=i("80d2");e["a"]=Object(s["h"])("spacer","div","v-spacer")},"368e":function(t,e,i){},"3c93":function(t,e,i){},"575c":function(t,e,i){"use strict";var s=i("6a53"),o=i.n(s);o.a},"5e23":function(t,e,i){},6101:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-dialog",{attrs:{fullscreen:"","hide-overlay":"",transition:"dialog-bottom-transition"},scopedSlots:t._u([{key:"activator",fn:function(e){e.on;return[i("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on;return[i("v-icon",t._g({staticClass:"cursor-type",attrs:{color:"success",large:""},on:{click:function(e){return t.editProduct()}}},s),[t._v("\n                mdi-pencil-circle\n              ")])]}}],null,!0)},[i("span",[t._v(" Editar Serviço ")])])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[i("div",{staticClass:"background-dialog"},[i("v-toolbar",{attrs:{dark:"",color:"primary"}},[i("v-btn",{attrs:{icon:"",dark:""},on:{click:function(e){t.dialog=!1}}},[i("v-icon",[t._v("mdi-close")])],1),i("v-toolbar-title",[t._v(" Editar Serviço - "+t._s(t.product.title))]),i("v-spacer"),i("v-toolbar-items",[i("v-btn",{attrs:{dark:"",text:""},on:{click:function(e){t.dialog=!1}}},[t._v("Salvar")])],1)],1),i("v-container",[i("v-row",{attrs:{align:"center",justify:"center"}},[i("v-col",{attrs:{cols:"12",sm:"10",md:"10"}},[i("v-card",[i("form",{staticClass:"pl-5 pr-5 pt-6 pb-6"},[i("v-row",[i("v-col",{attrs:{sm:"12"}},[i("v-select",{attrs:{required:"","error-messages":t.productEstablishmentErrors,items:t.establishments,label:"Estabelecimento","single-line":"","item-text":"name","item-value":"id"},on:{input:function(e){return t.$v.establishment.$touch()},blur:function(e){return t.$v.establishment.$touch()}},model:{value:t.establishment,callback:function(e){t.establishment=e},expression:"establishment"}})],1),i("v-col",{attrs:{cols:"12",sm:"12",md:"6"}},[i("v-text-field",{attrs:{"error-messages":t.productNameErrors,label:"Nome do Serviço",required:""},on:{input:function(e){return t.$v.product.title.$touch()},blur:function(e){return t.$v.product.title.$touch()}},model:{value:t.product.title,callback:function(e){t.$set(t.product,"title",e)},expression:"product.title"}})],1),i("v-col",{attrs:{cols:"12",sm:"12",md:"6"}},[i("v-text-field",{attrs:{"error-messages":t.productPriceErrors,label:"Preço",required:""},on:{input:function(e){return t.$v.product.price.$touch()},blur:function(e){return t.$v.product.price.$touch()}},model:{value:t.product.price,callback:function(e){t.$set(t.product,"price",e)},expression:"product.price"}})],1),i("v-col",{attrs:{cols:"12",sm:"12",md:"6"}},[i("v-textarea",{attrs:{"error-messages":t.productDescriptionErrors,name:"input-7-1",label:"Descrição do Serviço",rows:"1",required:""},on:{input:function(e){return t.$v.product.description.$touch()},blur:function(e){return t.$v.product.description.$touch()}},model:{value:t.product.description,callback:function(e){t.$set(t.product,"description",e)},expression:"product.description"}})],1),i("v-col",{attrs:{cols:"12",sm:"12",md:"6"}},[i("v-text-field",{attrs:{"error-messages":t.productDetailsValidateErrors,label:"Validade",required:""},on:{input:function(e){return t.$v.product.details.validate.$touch()},blur:function(e){return t.$v.product.details.validate.$touch()}},model:{value:t.product.details.validate,callback:function(e){t.$set(t.product.details,"validate",e)},expression:"product.details.validate"}})],1),i("v-file-input",{ref:"files",attrs:{label:"Avatar do Serviço",required:"",multiple:"",id:"files"},model:{value:t.files,callback:function(e){t.files=e},expression:"files"}})],1),i("v-row",{attrs:{align:"center",justify:"center"}},t._l(t.product.images,function(e,s){return i("v-col",{key:s,attrs:{cols:"12",sm:"6",md:"3"}},[i("v-img",{staticClass:"grey lighten-2",attrs:{src:t.image_url(e.url),"aspect-ratio":"1","max-width":"250","max-height":"150"}})],1)}),1),i("v-row",{attrs:{align:"center",justify:"center"}},[i("v-btn",{staticClass:"mr-4",attrs:{color:"primary"},on:{click:t.beforeSubmit}},[t._v(" Editar ")]),i("v-btn",{attrs:{color:"error"},on:{click:function(e){t.dialog=!1}}},[t._v(" Voltar ")])],1)],1)])],1)],1)],1)],1)])},o=[],r=i("1dce"),a=i("b5ae"),n=i("be3b"),l={mixins:[r["validationMixin"]],validations:{product:{title:{required:a["required"]},price:{required:a["required"]},description:{required:a["required"]},details:{validate:{required:a["required"]}}},establishment:{required:a["required"]}},props:["product_id"],data(){return{dialog:!1,notifications:!1,sound:!0,widgets:!1,product:{title:"",price:"",description:"",details:{validate:""}},establishment:null,establishments:[],files:[]}},mounted(){this.getEstablishments()},computed:{productNameErrors(){const t=[];return this.$v.product.title.$dirty?(!this.$v.product.title.required&&t.push("Insira o nome do Serviço."),t):t},productPriceErrors(){const t=[];return this.$v.product.price.$dirty?(!this.$v.product.price.required&&t.push("Insira o preço do Serviço."),t):t},productDescriptionErrors(){const t=[];return this.$v.product.description.$dirty?(!this.$v.product.description.required&&t.push("Insira a descrição do Serviço."),t):t},productDetailsValidateErrors(){const t=[];return this.$v.product.details.validate.$dirty?(!this.$v.product.details.validate.required&&t.push("Insira a validade do Serviço."),t):t},productEstablishmentErrors(){const t=[];return this.$v.establishment.$dirty?(!this.$v.establishment.required&&t.push("Selecione um estabelecimento."),t):t}},methods:{handleFilesUploads(){this.files=this.$refs.files.files},beforeSubmit(){this.$v.$touch(),this.$v.$invalid||this.submit()},async submit(){let t=null,e={description:this.product.description,details:{validate:this.product.details.validate},id:this.product.id,price:this.product.price,title:this.product.title},i=new FormData;i.append("product",JSON.stringify(e)),i.append("establishment",JSON.stringify(this.establishment)),i.append("access_token",localStorage.getItem("access_token"));for(var s=0;s<this.files.length;s++){let t=this.files[s];i.append("images["+s+"]",t)}await n["b"].patch(`/api/v1/products/${this.product_id}`,i,{headers:{"Content-Type":"multipart/form-data"}}).then(e=>{t=e}).catch(e=>{t=e}),201==t.status&&(this.$v.$reset(),this.product={title:"",price:"",description:"",details:{validate:""}},this.files="",this.dialog=!1)},async editProduct(){this.dialog=!0;let t=null;await n["b"].get(`/api/v1/products/${this.product_id}`,{params:{access_token:localStorage.getItem("access_token")}}).then(e=>{t=e}).catch(e=>{t=e}),200==t.status&&(this.product=t.data)},image_url(t){return t="http://"+t,t},async getEstablishments(){let t=null;await n["b"].get("/api/v1/establishments_by_user/",{params:{access_token:localStorage.getItem("access_token")}}).then(e=>{t=e}).catch(e=>{t=e}),200==t.status&&(this.establishments=t.data)}}},c=l,d=(i("575c"),i("2877")),h=i("6544"),u=i.n(h),p=i("8336"),v=i("b0af"),m=i("62ad"),f=i("a523"),b=i("169a"),g=i("23a7"),y=i("132d"),$=i("adda"),w=i("0fd9"),x=i("b974"),k=i("2fa4"),S=i("8654"),E=i("a844"),_=i("71d9"),C=i("2a7f"),O=i("3a2f"),B=Object(d["a"])(c,s,o,!1,null,"7cf640b8",null);e["default"]=B.exports;u()(B,{VBtn:p["a"],VCard:v["a"],VCol:m["a"],VContainer:f["a"],VDialog:b["a"],VFileInput:g["a"],VIcon:y["a"],VImg:$["a"],VRow:w["a"],VSelect:x["a"],VSpacer:k["a"],VTextField:S["a"],VTextarea:E["a"],VToolbar:_["a"],VToolbarItems:C["a"],VToolbarTitle:C["b"],VTooltip:O["a"]})},"6a53":function(t,e,i){},"71d9":function(t,e,i){"use strict";i("5e23");var s=i("8dd9"),o=i("adda"),r=i("80d2"),a=i("d9bd");e["a"]=s["a"].extend({name:"v-toolbar",props:{absolute:Boolean,bottom:Boolean,collapse:Boolean,dense:Boolean,extended:Boolean,extensionHeight:{default:48,type:[Number,String]},flat:Boolean,floating:Boolean,prominent:Boolean,short:Boolean,src:{type:[String,Object],default:""},tag:{type:String,default:"header"},tile:{type:Boolean,default:!0}},data:()=>({isExtended:!1}),computed:{computedHeight(){const t=this.computedContentHeight;if(!this.isExtended)return t;const e=parseInt(this.extensionHeight);return this.isCollapsed?t:t+(isNaN(e)?0:e)},computedContentHeight(){return this.height?parseInt(this.height):this.isProminent&&this.dense?96:this.isProminent&&this.short?112:this.isProminent?128:this.dense?48:this.short||this.$vuetify.breakpoint.smAndDown?56:64},classes(){return{...s["a"].options.computed.classes.call(this),"v-toolbar":!0,"v-toolbar--absolute":this.absolute,"v-toolbar--bottom":this.bottom,"v-toolbar--collapse":this.collapse,"v-toolbar--collapsed":this.isCollapsed,"v-toolbar--dense":this.dense,"v-toolbar--extended":this.isExtended,"v-toolbar--flat":this.flat,"v-toolbar--floating":this.floating,"v-toolbar--prominent":this.isProminent}},isCollapsed(){return this.collapse},isProminent(){return this.prominent},styles(){return this.measurableStyles}},created(){const t=[["app","<v-app-bar app>"],["manual-scroll",'<v-app-bar :value="false">'],["clipped-left","<v-app-bar clipped-left>"],["clipped-right","<v-app-bar clipped-right>"],["inverted-scroll","<v-app-bar inverted-scroll>"],["scroll-off-screen","<v-app-bar scroll-off-screen>"],["scroll-target","<v-app-bar scroll-target>"],["scroll-threshold","<v-app-bar scroll-threshold>"],["card","<v-app-bar flat>"]];t.forEach(([t,e])=>{this.$attrs.hasOwnProperty(t)&&Object(a["a"])(t,e,this)})},methods:{genBackground(){const t={height:Object(r["f"])(this.computedHeight),src:this.src},e=this.$scopedSlots.img?this.$scopedSlots.img({props:t}):this.$createElement(o["a"],{props:t});return this.$createElement("div",{staticClass:"v-toolbar__image"},[e])},genContent(){return this.$createElement("div",{staticClass:"v-toolbar__content",style:{height:Object(r["f"])(this.computedContentHeight)}},Object(r["q"])(this))},genExtension(){return this.$createElement("div",{staticClass:"v-toolbar__extension",style:{height:Object(r["f"])(this.extensionHeight)}},Object(r["q"])(this,"extension"))}},render(t){this.isExtended=this.extended||!!this.$scopedSlots.extension;const e=[this.genContent()],i=this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,on:this.$listeners});return this.isExtended&&e.push(this.genExtension()),(this.src||this.$scopedSlots.img)&&e.unshift(this.genBackground()),t(this.tag,i,e)}})},e707:function(t,e,i){"use strict";i("3c93");var s=i("a9ad"),o=i("7560"),r=i("f2e7"),a=i("58df"),n=Object(a["a"])(s["a"],o["a"],r["a"]).extend({name:"v-overlay",props:{absolute:Boolean,color:{type:String,default:"#212121"},dark:{type:Boolean,default:!0},opacity:{type:[Number,String],default:.46},value:{default:!0},zIndex:{type:[Number,String],default:5}},computed:{__scrim(){const t=this.setBackgroundColor(this.color,{staticClass:"v-overlay__scrim",style:{opacity:this.computedOpacity}});return this.$createElement("div",t)},classes(){return{"v-overlay--absolute":this.absolute,"v-overlay--active":this.isActive,...this.themeClasses}},computedOpacity(){return Number(this.isActive?this.opacity:0)},styles(){return{zIndex:this.zIndex}}},methods:{genContent(){return this.$createElement("div",{staticClass:"v-overlay__content"},this.$slots.default)}},render(t){const e=[this.__scrim];return this.isActive&&e.push(this.genContent()),t("div",{staticClass:"v-overlay",class:this.classes,style:this.styles},e)}}),l=n,c=i("80d2"),d=i("2b0e");e["a"]=d["a"].extend().extend({name:"overlayable",props:{hideOverlay:Boolean},data(){return{overlay:null}},watch:{hideOverlay(t){t?this.removeOverlay():this.genOverlay()}},beforeDestroy(){this.removeOverlay()},methods:{createOverlay(){const t=new l({propsData:{absolute:this.absolute,value:!1}});t.$mount();const e=this.absolute?this.$el.parentNode:document.querySelector("[data-app]");e&&e.insertBefore(t.$el,e.firstChild),this.overlay=t},genOverlay(){if(this.hideScroll(),!this.hideOverlay)return this.overlay||this.createOverlay(),requestAnimationFrame(()=>{this.overlay&&(void 0!==this.activeZIndex&&(this.overlay.zIndex=String(this.activeZIndex-1)),this.overlay.value=!0)}),!0},removeOverlay(t=!0){this.overlay&&(Object(c["a"])(this.overlay.$el,"transitionend",()=>{this.overlay&&this.overlay.$el&&this.overlay.$el.parentNode&&!this.overlay.value&&(this.overlay.$el.parentNode.removeChild(this.overlay.$el),this.overlay.$destroy(),this.overlay=null)}),this.overlay.value=!1),t&&this.showScroll()},scrollListener(t){if("keydown"===t.type){if(["INPUT","TEXTAREA","SELECT"].includes(t.target.tagName)||t.target.isContentEditable)return;const e=[c["w"].up,c["w"].pageup],i=[c["w"].down,c["w"].pagedown];if(e.includes(t.keyCode))t.deltaY=-1;else{if(!i.includes(t.keyCode))return;t.deltaY=1}}(t.target===this.overlay||"keydown"!==t.type&&t.target===document.body||this.checkPath(t))&&t.preventDefault()},hasScrollbar(t){if(!t||t.nodeType!==Node.ELEMENT_NODE)return!1;const e=window.getComputedStyle(t);return["auto","scroll"].includes(e.overflowY)&&t.scrollHeight>t.clientHeight},shouldScroll(t,e){return 0===t.scrollTop&&e<0||t.scrollTop+t.clientHeight===t.scrollHeight&&e>0},isInside(t,e){return t===e||null!==t&&t!==document.body&&this.isInside(t.parentNode,e)},checkPath(t){const e=t.path||this.composedPath(t),i=t.deltaY;if("keydown"===t.type&&e[0]===document.body){const t=this.$refs.dialog,e=window.getSelection().anchorNode;return!(t&&this.hasScrollbar(t)&&this.isInside(e,t))||this.shouldScroll(t,i)}for(let s=0;s<e.length;s++){const t=e[s];if(t===document)return!0;if(t===document.documentElement)return!0;if(t===this.$refs.content)return!0;if(this.hasScrollbar(t))return this.shouldScroll(t,i)}return!0},composedPath(t){if(t.composedPath)return t.composedPath();const e=[];let i=t.target;while(i){if(e.push(i),"HTML"===i.tagName)return e.push(document),e.push(window),e;i=i.parentElement}return e},hideScroll(){this.$vuetify.breakpoint.smAndDown?document.documentElement.classList.add("overflow-y-hidden"):(Object(c["b"])(window,"wheel",this.scrollListener,{passive:!1}),window.addEventListener("keydown",this.scrollListener))},showScroll(){document.documentElement.classList.remove("overflow-y-hidden"),window.removeEventListener("wheel",this.scrollListener),window.removeEventListener("keydown",this.scrollListener)}}})}}]);
//# sourceMappingURL=chunk-09b2698c.dcc23355.js.map