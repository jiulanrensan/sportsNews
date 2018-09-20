<template>
  <div class="home">
    <!-- 根据swiper数组的长度来决定是否显示这个轮播图 -->
    <swiper :options="swiperOption" v-if="swiper.length" class="swiper-wrap">
      <!-- 
        item和index分别指swiper数组里的当前元素和当前索引
        根据当前元素的type是否等于web来判断是否显示
       -->
      <swiper-slide v-for="(item,index) in swiper" :key="index" v-if="item.type!='web'" >
        <div class="title"><span>{{ item.title }}</span></div>
        <div class="box">
          <img :src="item.thumbnail" @click="toCarousel(item.id)">
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination" v-if="swiper.length>1"></div>
    </swiper>
    
    <!-- 专题list -->
    <div class="topicbox">
      <div class="category" v-for="(item,index) in topic.item" :key="index" @click="toTopic(item.id)">
        <img :src="item.thumbnail">
        <span class="title">{{ item.title }}</span>
      </div>
    </div>
    <!-- 下拉加载的新闻列表 -->
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
      <newslist :newsitem="news.item"
      @toArticle = "toArticle"
      @toCarousel = "toCarousel"
      @toVideo = "toVideo"
      @toTopic = "toTopic"
      ></newslist>
    </div>
    <loading :loadstatus="loadstatus"></loading>
    
    <!-- 
      基于路由的动态过渡,在router-view里面渲染内容
      定义不同的transiton-name,来决定路由跳转的动态效果
      再在css里面定义动态效果
       -->
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import loading from './loading'
  //import VueAwesomeSwiper from 'vue-awesome-swiper'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import { getNews } from '../getData/getData.js'
  import infiniteScroll from 'vue-infinite-scroll'
  import newslist from './newslist'
  import { dealurl } from '../config/tools.js'
  export default {
    name: 'home',
    data(){
      return {
        swiper: [],
        news: [],
        topic: [],
        page: 1,
        loadstatus: false,
        //等于true时代表正在执行加载，这时禁用滚动触发
        busy: true, 
        transitionName: 'router-slide',
        swiperOption: {
          pagination: '.swiper-pagination',
          /*pagination: {
            el: '.swiper-pagination',
            clickable :true
          },*/
          spaceBwtween: 30,
          centeredSlides: true,
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false
            },
          perspective:15,
          autoplayDisableOnInteraction: false,
          notNextTick: true,
          onSlideChangeEnd: swiper => {
            //this.currentSlide(swiper.realIndex)
            console.log(swiper);
          }
        }
      }
    },
    //在模板渲染成html前调用
    created(){
      this.init()
    },
    methods: {
      //异步函数
      //命名函数简写 init()
      //await只允许在async里使用，即等到await后面函数执行完才能进行下一步
      async init(){
        //发送请求
        let response = await getNews('TY43,FOCUSTY43,TYTOPIC',this.page++,'5.4.0');
        //console.log(response);
        //需要用到的数据在data中
        //forEach用来遍历，第一个是元素本身，第二个为索引值
        //对每一个data进行遍历
        //如果data.item不为空，则取data.type
        response.data.forEach((obj,index) => {
          if (obj.item) {
            let type = obj.type;
            if (type == 'focus') {
              this.swiper = obj.item;
            }
            else if (type == 'list') {
              this.news = obj;
            }
            else if (type == 'tytopic') {
              this.topic = obj;
            }
          }
        })
        console.log(this.news);
        console.log(this.swiper);
        //false表示无加载
        this.busy = false;
      },
      async loadMore(){
        this.busy = true;
        let response = await getNews('TY43',this.page++,'5.4.0');
        //扩展运算符，把数组元素用逗号分开
        //即把之前的和新的数组元素重新放进new.item里渲染
        this.news.item = [...this.news.item,...response.data[0].item];
        console.log(this.news.item);
        //page如果有尽头的话要另外设置loadstatus的值
        this.busy = false;
      },
      toArticle(params){
        this.$router.push('/home/article?'+params)
      },
      toCarousel(params){
        console.log(params);
        if (params.indexOf('.com/')>-1) {
          //url中有.com/则进行处理获取params
          this.$router.push('/home/carousel?' + dealurl(params));
        }
        else{//这是什么情况？
          this.$router.push('/home/carousel?' + params);
        }
      },
      toVideo(params){
        this.$router.push('/home/video?'+params);
      },
      toTopic(params){
        this.$router.push('/topic?' + dealurl(params));
      }
    },
    //用watch监听路由变化
    //to:要跳转到的页面
    //from:离开的页面
    watch: {
      '$route' (to,from){
        this.transitionName = to.path.indexOf("video")>0 ? 'router-right' : 'router-slide'
      }
    },
    //单独的组件里面使用
    directives: {infiniteScroll},
    components: {
      swiper,
      swiperSlide,
      newslist,
      loading
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .home{
    width: 100%;
  }
  .swiper-wrap{
    /*max-height: 360px;*/
    width: 100%;
    position: relative;
    .box{
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      img{
        width: 100%;
      }
    }
    
    .title{
      position: absolute;
      width: 100%;
      bottom: 4px;
      left: 0;
      background-color: rgba(0,0,0,0.4);
      z-index: 5;
      span{
        margin-left: 0.6rem;
        font-size: 20px;
        color: #fff;
      }
    }
  }
  .topicbox{
    padding: 0.3rem 0.26rem;
    margin: 0.5rem 0;
    display: flex;
    justify-content: space-between;
    .category{
      display: flex;
      flex-direction: column;
      align-items: center;
      img{
        width: 100%;
      }
      .title{
        padding-top: 0.6rem;
        line-height: 0.8rem;
        font-size: 16px;
      }
    }
  }
</style>
