<template>
	<div class="comment">
		<vheader :headTitle="titleName"></vheader>
		<div class="container">
			<!-- 热评 -->
			<div class="hot-comment">
				<!-- 热评标题 -->
				<div class="hot-title">热门评论</div>
				<!-- 热评内容 -->
				<commentlist :commentdata="hotcomment"></commentlist>
			</div>

			<!-- 最新评论 -->
			<div class="new-comment">
				<!-- 标题 -->
				<div class="new-title" v-if="newcomment.length">最新评论</div>
				<!-- 内容 -->
				<div class="new-item" v-infinite-scroll="loadMore"
				infinite-scroll-distance="20" infinite-scroll-disabled="busy">
					<commentlist :commentdata="newcomment"></commentlist>
				</div>
			</div>

			<!-- 已到底部 -->
			<loading :loadstatus="loadstatus"></loading>
		</div>
	</div>
</template>
<script>
	import vheader from './head'
	import { hotcomment,newcomment } from '../getData/getData.js'
	import infiniteScroll from 'vue-infinite-scroll'
	import loading from './loading'
	import commentlist from './commentlist'
	export default{
		name: 'comment',
		data(){
			return {
				titleName: '',
				hotcomment: [],
				url: '',
				count: '',
				newcomment: [],
				busy: true,
				loadstatus: false //等于true时代表正在执行加载，这时禁用滚动触发
			}
		},
		created(){
			this.init();
		},
		methods: {
			async init(){
				this.url = this.$route.query.url;
				this.titleName = this.$route.query.title;
				//返回20条，获取前十条热评
				let response = await hotcomment(1,this.url);
				console.log(this.$route.query);
				this.hotcomment = response.data.comments.slice(0,10);

				//获取最新评论
				//一次返回20条，也返回新评论总数
				response = await newcomment(this.page++,this.url);
				this.newcomment = response.data.comments;
				this.count = response.data.count;
				this.busy= false;
				if (this.count <= 20) {
					this.loadstatus = true;//没有数据了
					this.busy = true; //不能滚动
				}

				console.log(response);
			},
			async loadMore(){
				this.busy = true;
				let response = await newcomment(this.page,this.url);
				//把新返回的数据添加到原来的response数组当中
				this.newcomment = [...this.newcomment,...response.data.comments];
				if (response.data.comments.length < 20) {
					this.loadstatus = true; //没有数据显示
					return false; 
					//跳出函数,后面的不执行，则busy一直true(不滚动)
				}
				this.busy = false;//可以滚动
			}
		},
		directives: {infiniteScroll},
		components: {
			vheader,
			loading,
			commentlist
		}
	}
</script>
<style scoped lang="scss">
	.comment{
		/*设置position后infiniteScroll不生效*/
		/*position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;*/
		background-color: #fff;
		.container{
			width: 100%;
			height: 100%;
			padding-top: 70px;
			.hot-comment,
			.new-comment{
				padding: 0.5rem;
				margin-bottom: 1rem;
				.hot-title,
				.new-title{
					font-size: 20px;
					color: #FF7256;

				}
			}
		}
	}
</style>