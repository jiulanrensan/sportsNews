webpackJsonp([1],{"7XJX":function(t,e){},GLlk:function(t,e,n){var i;i=function(){"use strict";var t="@@InfiniteScroll",e=function(t){return t===window?Math.max(window.pageYOffset||0,document.documentElement.scrollTop):t.scrollTop},n=document.defaultView.getComputedStyle,i=function(t){return t===window?e(window):t.getBoundingClientRect().top+e(window)},o=function(t){for(var e=t.parentNode;e;){if("HTML"===e.tagName)return!0;if(11===e.nodeType)return!1;e=e.parentNode}return!1},r=function(){if(!this.binded){this.binded=!0;var t,e,i,o,r,a,l,c,u=this,d=u.el,m=d.getAttribute("infinite-scroll-throttle-delay"),v=200;m&&(v=Number(u.vm[m]||m),(isNaN(v)||v<0)&&(v=200)),u.throttleDelay=v,u.scrollEventTarget=function(t){for(var e=t;e&&"HTML"!==e.tagName&&"BODY"!==e.tagName&&1===e.nodeType;){var i=n(e).overflowY;if("scroll"===i||"auto"===i)return e;e=e.parentNode}return window}(d),u.scrollListener=(t=s.bind(u),e=u.throttleDelay,c=function(){t.apply(a,l),o=i},function(){if(a=this,l=arguments,i=Date.now(),r&&(clearTimeout(r),r=null),o){var t=e-(i-o);t<0?c():r=setTimeout(function(){c()},t)}else c()}),u.scrollEventTarget.addEventListener("scroll",u.scrollListener),this.vm.$on("hook:beforeDestroy",function(){u.scrollEventTarget.removeEventListener("scroll",u.scrollListener)});var f=d.getAttribute("infinite-scroll-disabled"),h=!1;f&&(this.vm.$watch(f,function(t){u.disabled=t,!t&&u.immediateCheck&&s.call(u)}),h=Boolean(u.vm[f])),u.disabled=h;var p=d.getAttribute("infinite-scroll-distance"),_=0;p&&(_=Number(u.vm[p]||p),isNaN(_)&&(_=0)),u.distance=_;var w=d.getAttribute("infinite-scroll-immediate-check"),g=!0;w&&(g=Boolean(u.vm[w])),u.immediateCheck=g,g&&s.call(u);var y=d.getAttribute("infinite-scroll-listen-for-event");y&&u.vm.$on(y,function(){s.call(u)})}},s=function(t){var n=this.scrollEventTarget,o=this.el,r=this.distance;if(!0===t||!this.disabled){var s=e(n),a=s+function(t){return t===window?document.documentElement.clientHeight:t.clientHeight}(n),l=!1;if(n===o)l=n.scrollHeight-a<=r;else l=a+r>=i(o)-i(n)+o.offsetHeight+s;l&&this.expression&&this.expression()}},a={bind:function(e,n,i){e[t]={el:e,vm:i.context,expression:n.value};var s=arguments;e[t].vm.$on("hook:mounted",function(){e[t].vm.$nextTick(function(){o(e)&&r.call(e[t],s),e[t].bindTryCount=0;!function n(){e[t].bindTryCount>10||(e[t].bindTryCount++,o(e)?r.call(e[t],s):setTimeout(n,50))}()})})},unbind:function(e){e&&e[t]&&e[t].scrollEventTarget&&e[t].scrollEventTarget.removeEventListener("scroll",e[t].scrollListener)}},l=function(t){t.directive("InfiniteScroll",a)};return window.Vue&&(window.infiniteScroll=a,Vue.use(l)),a.install=l,a},t.exports=i()},IHPB:function(t,e,n){"use strict";e.__esModule=!0;var i,o=n("kfHR"),r=(i=o)&&i.__esModule?i:{default:i};e.default=function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return(0,r.default)(t)}},KgXo:function(t,e,n){"use strict";var i={name:"loading",data:function(){return{}},props:{loadstatus:{type:Boolean,default:!1}}},o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{directives:[{name:"show",rawName:"v-show",value:!this.loadstatus,expression:"!loadstatus"}],staticClass:"loadmore"},[this._v("\n\t\t正在加载...\n\t")]),this._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:this.loadstatus,expression:"loadstatus"}],staticClass:"loadnone"},[this._v("\n\t\t加载完毕\n\t")])])},staticRenderFns:[]};var r=n("vSla")(i,o,!1,function(t){n("o7ds")},null,null);e.a=r.exports},kfHR:function(t,e,n){t.exports={default:n("qQfv"),__esModule:!0}},kksE:function(t,e,n){"use strict";var i=n("lIiZ"),o=n("go9Q");t.exports=function(t,e,n){e in t?i.f(t,e,o(0,n)):t[e]=n}},lVAl:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("IHPB"),o=n.n(i),r=n("lC5x"),s=n.n(r),a=n("J0Oq"),l=n.n(a),c=n("2Hch"),u=n("Vd6H"),d=n("GLlk"),m=n.n(d),v=n("KgXo"),f={name:"commentlist",data:function(){return{}},props:{commentdata:{type:Array,default:function(){return[]}}}},h={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"commentlist"},t._l(t.commentdata,function(e,i){return n("div",{key:i,staticClass:"list-item"},[n("div",{staticClass:"user"},[t._v("\n\t\t\t"+t._s(e.ip_from?e.ip_from:e.client_ip)+"\n\t\t\t"),n("span",[t._v(t._s(e.uname))])]),t._v(" "),n("div",{staticClass:"content"},[n("div",{staticClass:"con"},[t._v(t._s(e.comment_contents))]),t._v(" "),e.parent.length?n("div",{staticClass:"parent"},[t._v("\n\t\t\t\t"+t._s(e.parent[0].comment_contents)+"\n\t\t\t")]):t._e()]),t._v(" "),n("div",{staticClass:"other"},[n("div",{staticClass:"time"},[t._v(t._s(e.comment_date))]),t._v(" "),n("div",{staticClass:"uptimes"},[t._v("赞"+t._s(e.uptimes))])])])}))},staticRenderFns:[]};var p=n("vSla")(f,h,!1,function(t){n("xNCV")},"data-v-865c5330",null).exports,_={name:"comment",data:function(){return{titleName:"",hotcomment:[],url:"",count:"",newcomment:[],busy:!0,loadstatus:!1}},created:function(){this.init()},methods:{init:function(){var t=this;return l()(s.a.mark(function e(){var n;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.url=t.$route.query.url,t.titleName=t.$route.query.title,e.next=4,Object(u.d)(1,t.url);case 4:return n=e.sent,console.log(t.$route.query),t.hotcomment=n.data.comments.slice(0,10),e.next=9,Object(u.e)(t.page++,t.url);case 9:n=e.sent,t.newcomment=n.data.comments,t.count=n.data.count,t.busy=!1,t.count<=20&&(t.loadstatus=!0,t.busy=!0),console.log(n);case 15:case"end":return e.stop()}},e,t)}))()},loadMore:function(){var t=this;return l()(s.a.mark(function e(){var n;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.busy=!0,e.next=3,Object(u.e)(t.page,t.url);case 3:if(n=e.sent,t.newcomment=[].concat(o()(t.newcomment),o()(n.data.comments)),!(n.data.comments.length<20)){e.next=8;break}return t.loadstatus=!0,e.abrupt("return",!1);case 8:t.busy=!1;case 9:case"end":return e.stop()}},e,t)}))()}},directives:{infiniteScroll:m.a},components:{vheader:c.a,loading:v.a,commentlist:p}},w={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"comment"},[n("vheader",{attrs:{headTitle:t.titleName}}),t._v(" "),n("div",{staticClass:"container"},[n("div",{staticClass:"hot-comment"},[n("div",{staticClass:"hot-title"},[t._v("热门评论")]),t._v(" "),n("commentlist",{attrs:{commentdata:t.hotcomment}})],1),t._v(" "),n("div",{staticClass:"new-comment"},[t.newcomment.length?n("div",{staticClass:"new-title"},[t._v("最新评论")]):t._e(),t._v(" "),n("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],staticClass:"new-item",attrs:{"infinite-scroll-distance":"20","infinite-scroll-disabled":"busy"}},[n("commentlist",{attrs:{commentdata:t.newcomment}})],1)]),t._v(" "),n("loading",{attrs:{loadstatus:t.loadstatus}})],1)],1)},staticRenderFns:[]};var g=n("vSla")(_,w,!1,function(t){n("7XJX")},"data-v-6a505567",null);e.default=g.exports},o7ds:function(t,e){},qQfv:function(t,e,n){n("IsPG"),n("yrDz"),t.exports=n("AKd3").Array.from},xNCV:function(t,e){},yrDz:function(t,e,n){"use strict";var i=n("WwGG"),o=n("FITv"),r=n("OXaN"),s=n("kDTw"),a=n("V2W7"),l=n("CFGK"),c=n("kksE"),u=n("YW8S");o(o.S+o.F*!n("75+0")(function(t){Array.from(t)}),"Array",{from:function(t){var e,n,o,d,m=r(t),v="function"==typeof this?this:Array,f=arguments.length,h=f>1?arguments[1]:void 0,p=void 0!==h,_=0,w=u(m);if(p&&(h=i(h,f>2?arguments[2]:void 0,2)),void 0==w||v==Array&&a(w))for(n=new v(e=l(m.length));e>_;_++)c(n,_,p?h(m[_],_):m[_]);else for(d=w.call(m),n=new v;!(o=d.next()).done;_++)c(n,_,p?s(d,h,[o.value,_],!0):o.value);return n.length=_,n}})}});
//# sourceMappingURL=1.d1622466dbc633c546ea.js.map