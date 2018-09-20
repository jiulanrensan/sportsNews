<template>
	<div class="topic">
		<vheader :headTitle="titleName"></vheader>
		<div class="container">
			<!-- 
				返回的data.body.subjects数组里有四个对象，
				view值分别是multiTitle,slider,list,list,因此循环数组,通过判断view值决定是否显示
			 -->
		  <div v-for="(item,index) in subjects" :key="index">
		 		<div class="multiTitle" v-if="item.view=='multiTitle'">
		 			<img :src="item.content.bgImage"></img>
		 		</div>

		 		<div class="text" v-else-if="item.view=='text'">
		 			<div>{{ item.content.intro }}</div>
		 		</div>

		 		<div class="slider" v-else-if="item.view=='slider'">
		 			<swiper :options="swiperOption" class="swiper">
		 				<swiper-slide v-for="(el,i) in item.podItems" :key="i">
		 					<div class="title"><span>{{ el.title }}</span></div>
		 					<img :src="el.thumbnail">
		 				</swiper-slide>
		 			</swiper>
		 		</div>

				<!-- 都不是则显示newlist -->
		 		<div class="newslist" v-else>
		 			<topiclist :topiclist="item" @toCarousel="toCarousel"
		 			@toArticle="toArticle"
		 			@toVideo="toVideo"
		 			></topiclist>
		 			<!--  -->
		 		</div>

		  </div>
		</div>
		<transition name="router-slide">
      <router-view></router-view>
    </transition>
	</div>
</template>
<script>
	import vheader from './head'
	import topiclist from './topiclist'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import { getarticle } from '../getData/getData.js'
	import { geturl,dealurl } from '../config/tools.js'
	export default{
		name: 'topic',
		data(){
			return{
				titleName: '专题',
				subjects: [],
				swiperOption: {
					notNextTick: true,
					autoplay: 3000
				}
			}
		},
		created(){
			this.init();
		},
		methods: {
			async init(){
				let response = await getarticle(geturl(this.$route.query));
				console.log(response);
				this.subjects = response.data.body.subjects;
			},
			//定义topiclist的方法
			toCarousel(params){
				//有.com/则要取.com/后面的params
				console.log(params);
				if(params.indexOf(".com/")>0){
	        this.$router.push('/topic/carousel?'+dealurl(params));
	      }
	      else{
	        this.$router.push('/topic/carousel?'+params);
	      }
			},

			toArticle(params){
				console.log(params);
	      this.$router.push('/topic/article?'+params);
	    },

	    toVideo(params){
	    	console.log(params);
	      this.$router.push('/topic/video?'+params);
	    }
		},
		components: {
			vheader,
			swiper,
			swiperSlide,
			topiclist
		}
	}
</script>
<style scoped lang="scss">
	.container{
		width: 100%;
		height: 100%;
		overflow: auto;
		padding-top: 50px;
	}
	.multiTitle{
		width: 100%;
		img{
			width: 100%;
		}
	}
	.text{
		margin: 1rem;
	}
	.swiper{
		width: 100%;
		position: relative;
		img{
			width: 100%;
		}
		.title{
			position: absolute;
			width: 100%;
			bottom: 4px;
      left: 0;
      background-color: rgba(0,0,0,0.4);
			span{
				margin-left: 0.6rem;
				color: #fff;
				font-size: 18px;
			}
		}
	}
</style>