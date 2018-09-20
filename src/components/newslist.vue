<template>
	<div class="newslist">
		<div v-for="(list,index) in newsitem" :key="index">
			<!-- 四种类型，判断是否显示 -->			
			<div class="newsitem" v-if="list.type=='doc'" @click='toArticle(list.id)'>
				<div class="imgbox">
					<div class="box" v-if="list.thumbnail">
						<img :src="list.thumbnail">
					</div>
				</div>
				<div class="content">
					<span>{{ list.title }}</span>
					<span class="time">{{ list.updateTime }}</span>
				</div>
				<span class="commentnum">{{ list.commentsall }}</span>
			</div>

			<div class="newsitem" v-else-if="list.type=='topic2'" @click="toTopic(list.id)">
				<div class="imgbox">
					<div class="box" v-if="list.thumbnail">
						<img :src="list.thumbnail">
					</div>
				</div>
				<div class="content">
					<span>{{ list.title }}</span>
					<span class="subtopic">专题</span>
				</div>
				<span class="commentnum">{{ list.commentsall }}</span>
			</div>

			<div class="videoitem" v-else-if="list.type=='phvideo'" @click="toVideo(list.id)">
          <div class="title">{{ list.title }}</div>
          <div class="video">
          	<i class="iconfont icon-play"></i>
            <img :src="list.thumbnail">
            <!-- <span class="commentnum">{{ list.commentsall }}</span> -->
          </div>
      </div>
			<div class="newslide" v-else-if="list.type=='slide'" @click="toCarousel(list.id)">
        <div class="title">{{ list.title }}</div>
        <div class="imgbox">
        	<div class="box" v-for="(img,index) in list.style.images">
        		<img :src="img" :key="index">
        	</div>
        </div>
        <!-- <span class="commentnum">{{ list.commentsall }}</span> -->
      </div>
    </div>
	</div>
</template>

<script type="text/javascript">
	import { dealurl } from '../config/tools.js'
	export default{
		name: 'newslist',
		data () {
			return {
				//没在data里面定义list，会让整个组件报错
				list: ''
			}
		},
		props: {
			//父组件传入newsitem，在这里定义
			newsitem: {
				type: Array

			}
		},
		methods: {
			toArticle(url){
				//子组件触发父组件的自定义事件
	      this.$emit('toArticle',dealurl(url));
	    },
	    toCarousel(url){
	      this.$emit('toCarousel',dealurl(url));
	    },
	    toVideo(url){
	      this.$emit('toVideo',dealurl(url));
	    },
	    toTopic(url){
	      this.$emit('toTopic',url);
	    },
		}
	}
</script>
<style scoped lang="scss">
	.newsitem{
		width: 100%;
		height: 8rem;
		position: relative;
		padding: 0.5rem 0.6rem;
		display: flex;
		/*justify-content: center;*/
		justify-content: left;
		border-bottom: 1px solid rgba(0,0,0,0.2);

		.imgbox{
			width: 11rem;
			height: 100%;
			margin-right: 0.5rem;
			
			.box{
				width: 100%;
				height: 100%;
				position: relative;
				overflow: hidden;
				img{
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					-webkit-transform: translateY(-50%);
					-moz-transform: translateY(-50%);
					width: 100%;
				}
			}
			
		}
		.content{
			width: 63%;
			font-size: 16px;
			position: relative;
			text-align: left;
		}
		.commentnum{
			position: absolute;
			bottom: 0.5rem;
			right: 0.5rem;
			font-size: 14px;
		}
		.time{
			position: absolute;
			bottom: 0;
			left: 0;
			font-size: 14px;
		}
		.subtopic{
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    font-size: 14px;
	    color: #fff;
	    /*padding: 0.08rem 0.133333rem;*/
	    background: red;
	  }
	}
	.newslide{
		border-bottom: 1px solid rgba(0,0,0,0.2);
		padding: 0.6rem;
		font-size: 16px;
		position: relative;
		.title{
			text-align: left;
			line-height: 1.2rem;
		}
		.imgbox{
			padding: 0.5rem 0 0;
			display: flex;
			justify-content: space-between;
			.box{
				width: 30%;
				img{
					width: 100%;
					overflow: hidden;
				}
			}
		}
		.commentnum{
			position: absolute;
			bottom: 0.4rem;
			right: 0.4rem;
			font-size: 14px;
		}
	}
	.videoitem{
		width: 100%;
		position: relative;
		padding: 0.6rem;
		.title{
			font-size: 18px;
			line-height: 2rem;
			margin-bottom: 0.4rem;
		}
		.video{
			width: 100%;
			/*height: 100px;*/
			overflow: hidden;
			position: relative;
			i{
				cursor: pointer;
				left: 50%;
				-webkit-transform: translate(-50%,-50%);
		    -moz-transform: translate(-50%,-50%);
		    transform:translate(-50%,-50%);
				font-size: 3rem;
				background-color: rgba(0,0,0,0.3);
				border-radius: 50%;
			}
			img{
				/*height: 100%;*/
				width: 100%;
			}
			.commentnum{
				position: absolute;
				bottom: 0.4rem;
				right: 0.4rem;
				font-size: 14px;
			}
		}

	}
</style>