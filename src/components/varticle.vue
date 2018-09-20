<template>
	<div class="article-con">
		<!-- 头部 -->
		<vheader :headTitle="titleName"></vheader>
		<!-- 文章正文 -->
		<div class="article-box">
			<div class="title">{{ item.title }}</div>
			<div class="source-time">
				<span>{{ item.updateTime }}</span>
				<span>{{ item.source }}</span>
			</div>
			<!-- 返回的数据为html，直接渲染为html -->
			<div class="content htmlbox" v-html="item.text"></div>
		</div>
		<!-- 评论图标 -->
		<div class="comment" @click="toComment">
			<i class="iconfont icon-comments"></i>
			<span class="comment-num">{{ commentnum }}</span>
		</div>
	</div>
</template>
<script>
	import vheader from './head'
	import { getarticle,hotcomment } from './../getData/getData.js'
	import { geturl } from './../config/tools.js'
	export default{
		name: 'varticle',
		data(){
			return {
				titleName: '文章',
				item: {},
				commentsUrl: '',
				commentnum: ''
				//y: 0
			}
		},
		created(){
			this.init();	
			//this.y = document.body.scrollTop;
			//document.body.setAttribute("class","hid");
		},
		/*destroyed(){
			document.body.scrollTop = this.y
    	document.body.removeAttribute("class","hid");
  	},*/
		methods: {
			async init(){
				//通过 this.$route访问当前路由
				let res = await getarticle(geturl(this.$route.query));
				console.log(this.$route.query);
				console.log(geturl(this.$route.query));
				console.log(res);
				this.item = res.data.body;
				this.commentsUrl = this.item.commentsUrl;
				//获取评论
  			let comnum = await hotcomment(1,this.commentsUrl)
  			//this.commentnum = comnum.data.join_count;
  			console.log(this.commentsUrl);
  			//sub_79114448
			},
			toComment(){
				this.$router.push('/comment?title=' + this.item.title + '&url=' + this.commentsUrl);
			}
		},
		components: {
			vheader
		}
	}
</script>
<style lang="scss" scoped>
	/*隐藏滚轮*/
	/*
	::-webkit-scrollbar{
			
			display: none;
		}*/
	.article-con::-webkit-scrollbar{
			display: none;
		}
	.article-con{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		z-index: 2;
		overflow: auto;

		.article-box{
			width: 100%;
			/*height: 100%;*/
			padding-top: 4rem;
		}
		.article-box>*{
			margin: 0 1rem;
		}
		.title{
			font-size: 20px;
			font-weight: bold;
		}
		.source-time{
			font-size: 14px;
			color: #666;
		}
		.content{
			margin-top: 2rem;
			font-size: 18px;
			color: #666;
			line-height: 1.5;
		}
		.comment{
			height: 30px;
			padding: 0.5rem 1rem;
			margin-bottom: 2rem;
			i{
					position: static;
					color: #000;
					padding: 2px;
					font-size: 30px;
					display: inline-block;
					transform: translateY(0);
				}
			.comment-num{
				line-height: 20px;
				font-size: 17px;
				color: #000;
				display: inline-block;
			}
		}
	}
</style>