webpackJsonp([5],{"3/Kl":function(t,e){},yytp:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("lC5x"),n=s.n(i),r=s("J0Oq"),a=s.n(r),o=s("DMPO"),c=s("2Hch"),l=s("Vd6H"),m={name:"carousel",data:function(){return{imglist:[],title:"",commentnum:"",page:1,commentsUrl:"",titleName:"图片",des:"",current:1,swiperOption:{autoplay:{delay:3e3,disableOnInteraction:!1},notNextTick:!0,freeMode:!1,centeredSlides:!0}}},created:function(){this.init()},methods:{init:function(){var t=this;return a()(n.a.mark(function e(){var s,i,r;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return s="",s=t.$route.query.type,e.next=4,Object(l.c)(s);case 4:return i=e.sent,console.log(i),t.imglist=i.data.body.slides,t.title=i.data.body.title,t.commentsUrl=i.data.body.commentsUrl,t.des=i.data.body.slides[0].description,console.log(t.commentsUrl),e.next=13,Object(l.d)(t.page,t.commentsUrl);case 13:r=e.sent,console.log(r),t.commentnum=r.data.join_count;case 16:case"end":return e.stop()}},e,t)}))()},toComment:function(){this.$router.push("/comment?title="+this.title+"&url="+this.commentsUrl)}},computed:{swiper:function(){return this.$refs.mySwiper.swiper}},mounted:function(){var t=this;this.swiper.on("slideChangeTransitionEnd",function(){t.current=this.realIndex+1,t.des=t.imglist[this.realIndex].description})},components:{swiper:o.swiper,swiperSlide:o.swiperSlide,vheader:c.a}},d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"carousel"},[s("vheader",{attrs:{headTitle:t.titleName}}),t._v(" "),s("div",{staticClass:"container"},[s("swiper",{ref:"mySwiper",staticClass:"carouselwrap",attrs:{options:t.swiperOption}},t._l(t.imglist,function(t,e){return s("swiper-slide",{key:e,staticClass:"swiper-item"},[s("img",{attrs:{src:t.image}})])})),t._v(" "),s("div",{staticClass:"comment",on:{click:t.toComment}},[s("i",{staticClass:"iconfont icon-comments"}),t._v(" "),s("span",{staticClass:"comment-num"},[t._v(t._s(t.commentnum))])]),t._v(" "),s("div",{staticClass:"content"},[s("div",{staticClass:"title"},[t._v(t._s(t.title))]),t._v(" "),s("span",{staticClass:"currentimg"},[t._v(t._s(t.current)+"/"+t._s(t.imglist.length))]),t._v(" "),s("div",{staticClass:"des"},[t._v(t._s(t.des))])])],1),t._v(" "),s("transition",{attrs:{name:"router-slide"}},[s("router-view")],1)],1)},staticRenderFns:[]};var u=s("vSla")(m,d,!1,function(t){s("3/Kl")},"data-v-b7a5f382",null);e.default=u.exports}});
//# sourceMappingURL=5.7ebe951d20dd137bae07.js.map