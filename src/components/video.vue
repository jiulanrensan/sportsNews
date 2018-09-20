<template>
	<div class="video">
		<vheader :headTitle="title"></vheader>
		<div class="container">
			<video :src="type" controls="controls"></video>
		</div>
	</div>
</template>
<script>
	import vheader from './head'
	import { videoitem } from '../getData/getData.js'
	export default{
		name: 'videolist',
		data() {
			return {
				title: '视频',
				type: ''
			}
		},
		created(){
			this.init();
		},
		methods: {
			async init(){
				let query = this.$route.query;
				console.log(query);
				if (query.type) {
					this.type = query.type;
				}
				else if (query.video) {
					//await获取数据之后才执行下一步
					let response = await videoitem(query.video);
					console.log(response);
					//可选多种视频清晰度
					this.type = response.data.singleVideoInfo[0].videoURLMid;
				}
			}
		},
		components: {
			vheader
		}
	}
</script>
<style scoped lang="scss">
	.video{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #000;
		.container{
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;/*垂直居中*/
			video{
				width: 100%;
			}
		}
	}
</style>