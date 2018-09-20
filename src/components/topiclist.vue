<template>
	<div class="topiclist">
		<!-- 标题 -->
		<div class="listtitle">{{ topiclist.title }}</div>

		<!-- 循环 -->
		<div v-for="(item,index) in topiclist.podItems" :key="index">
			<!-- 内容,通过判断type值是否显示 -->
			<!-- doc -->
			<div class="newsitem" v-if="item.link.type=='doc'" @click="toArticle(item.id ? item.id : item.link.url)">
				<div class="imgbox">
					<div class="box">
						<img :src="item.thumbnail" v-if="item.thumbnail">
						<div v-else class="none">暂无图片</div>
					</div>
				</div>
				<div class="content">
					<div class="title">{{ item.title }}</div>
					<div class="time">{{ item.updatetime }}</div>
					<div class="commentnum">{{ item.comments }}</div>
				</div>
			</div>

			<!-- video -->
			<div class="newsitem" v-else-if="item.link.type=='video'" @click="toVideo(item.mp4 ? item.mp4 : item.link.url)">
				<div class="imgbox">
					<div class="box">
						<img :src="item.thumbnail" v-if="item.thumbnail">
						<div v-else class="none">暂无图片</div>
					</div>
				</div>
				<div class="content">
					<div class="title">{{ item.title }}</div>
					<div class="time">{{ item.updatetime }}</div>
					<div class="commentnum">{{ item.comments }}</div>
				</div>
			</div>

			<!-- slide -->
			<!-- 
				<div class="newsslide" v-else-if="item.link.type=='slide'" @click="toCarousel(item.id ? item.id : item.link.url)">
				<div class="title">{{ item.title }}</div>
				<div class="imgbox">
					<div class="box">
						<img :src="item.thumbnail" v-if="item.thumbnail">
						<div v-else class="none">暂无图片</div>
					</div>
				</div>
				<div class="commentnum">{{ item.comments }}</div>
			</div>
			 -->
		</div>
	</div>
</template>
<script>
	import { dealurl } from '../config/tools.js'
	export default{
		name: 'topiclist',
		data(){
			return {}
		},
		props: {
			topiclist: {
				type: Object,
				default: function(){
					return {}
				}
			}
		},
		methods: {
			//自定义方法
			toArticle(url){
				this.$emit('toArticle',dealurl(url));
			},
			toCarousel(url){
      	this.$emit('toCarousel',dealurl(url));
	    },
	    toVideo(url){
	      this.$emit('toVideo',dealurl(url));
	    }
		}
	}
</script>
<style scoped lang="scss">
	.listtitle{
		margin-left: 0.6rem;
		font-size: 1.2rem;
		padding: 0.6rem 0;
	}
	.newsitem{
		width: 100%;
		height: 8rem;
		position: relative;
		padding: 0.5rem 0.6rem;
		display: flex;
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
					/*top: 50%;
					transform: translateY(-50%);
					-webkit-transform: translateY(-50%);
					-moz-transform: translateY(-50%);*/
					width: 100%;
					/*height: 100%;
					left: 50%;
					transform: translateX(-50%);
					-webkit-transform: translateX(-50%);
					-moz-transform: translateX(-50%);*/
				}
			}
		}
		.content{
			width: 63%;
			font-size: 16px;
			position: relative;
			text-align: left;
			.commentnum{
				position: absolute;
				bottom: 0.5rem;
				left: 0.5rem;
				font-size: 14px;
			}
		}
	}
</style>