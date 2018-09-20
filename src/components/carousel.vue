<template>
	<div class="carousel">
		<vheader :headTitle="titleName"></vheader>
		<!-- container包含所有内容 -->
		<div class="container">

			<!-- 轮播图详情 -->
			<swiper :options="swiperOption" class="carouselwrap" ref="mySwiper">
				<swiper-slide v-for="(item,index) in imglist" :key="index" class="swiper-item">
					<img :src="item.image">
				</swiper-slide>
				
			</swiper>

			<!-- 评论图标 -->
			<div class="comment" @click="toComment">
				<i class="iconfont icon-comments"></i>
				<span class="comment-num">{{ commentnum }}</span>
			</div>
			<!-- 轮播图内容 -->
			<div class="content">
				<div class="title">{{ title }}</div>
				<span class="currentimg">{{ current }}/{{ imglist.length }}</span>
				<div class="des">{{ des }}</div>
			</div>
		</div>
		<transition name="router-slide">
      <router-view></router-view>
    </transition>
	</div>
</template>
<script>
	//import VueAwesomeSwiper from 'vue-awesome-swiper'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import vheader from './head'
  import { getcarousel,hotcomment } from '../getData/getData.js'
  export default{
  	name: 'carousel',
  	data() {
  		return {
  			imglist: [],
  			title: '',
  			commentnum: '',
  			page: 1,
  			commentsUrl: '',
  			titleName: '图片',
  			des: '',
  			current: 1,
  			swiperOption: {
					//initialSlide: 0,
		  		autoplay: {
			        delay: 3000,
			        disableOnInteraction: false
		        },
					notNextTick: true,
					freeMode: false,
					
					//默认居中
					centeredSlides: true,
					/*回调函数，swiper从一个slide过渡到另一个slide结束时执行,可接受swiper实例作为参数
					realIndex:当前活动块的索引*/
					/*onSlideChangeEnd: swiper => {
						//this.currentSlide(swiper.realIndex);
						console.log(this.realIndex);
					}*/
					/*on: {
              slideChangeTransitionEnd: function(){
              	console.log(this.realIndex);
              	this.current = this.realIndex;
              }
          }*/
				}
  		}
  	},
  	created(){
  		this.init();
  	},
  	methods: {
  		async init(){
  			let type = '';
  			type = this.$route.query.type;
  			//获取轮播图数据
  			let response = await getcarousel(type);
  			console.log(response);
  			this.imglist = response.data.body.slides;
  			this.title = response.data.body.title;
  			this.commentsUrl = response.data.body.commentsUrl;
  			this.des = response.data.body.slides[0].description;
  			console.log(this.commentsUrl);
  			//获取评论
  			let comnum = await hotcomment(this.page,this.commentsUrl);
  			console.log(comnum);
  			this.commentnum = comnum.data.join_count;
  		},
  		/*currentSlide(index){
  			//在轮播当前图片结束时调用此函数，index+1为下一张图片的索引
  			this.current = index + 1;
  			this.des = response.data.body.slides[index].description;
  		},*/
  		toComment(){
  			this.$router.push('/comment?title=' + this.title + '&url=' + this.commentsUrl);
  		}
  	},
  	computed: {  
	    swiper() {  
	      return this.$refs.mySwiper.swiper;  
	    }
	  }, 
	  mounted(){
	  	//this.swiper的函数里的this指向swiper,所以这里要定义一个_this指向vue
	  	let _this = this;
	  	this.swiper.on('slideChangeTransitionEnd', function(){
		    _this.current = this.realIndex + 1;
		    _this.des = _this.imglist[this.realIndex].description;
		  });
	  },
  	components: {
  		swiper, 
  		swiperSlide,
  		vheader
  	}
  }
</script>
<style scoped lang="scss">
	.carousel{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 2;
		background-color: #000;
		.container{
			width: 100%;
			height: 100%;
			position: relative;
			.carouselwrap{
				width: 100%;
				height: 100%;
				.swiper-item{
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					img{
						width: 100%;
					}
				}
			}
			.comment{
				position: absolute;
				z-index: 3;
				right: 0;
				top: 70px;
				height: 20px;
				padding-right: 1rem;
				vertical-align: middle;
				i{
					position: static;
					color: white;
					padding: 2px;
					font-size: 25px;
					display: inline-block;
					transform: translateY(0);
				}
				.comment-num{
					line-height: 20px;
					padding: 2px;
					font-size: 17px;
					color: white;
					display: inline-block;
				}
			}
			.content{
				/*绝对定位只不设置顶部，则定位于下端，
				并根据里面内容填充高度*/
				z-index: 10;
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				padding: 0.3rem;
				background-color: rgba(0,0,0,0.3);
				color: white;
				.title{
					width: 90%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					padding: 0.3rem;
					font-size: 19px;
				}
				.des{
					padding: 0.3rem;
					height: 10rem;
				}
				.currentimg{
					position: absolute;
					right: 0.5rem;
					top: 0.5rem;
				}
			}
		}
	}
</style>