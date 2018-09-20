<template>
	<div class="header">
		<div class="head-back">
			<!-- 要对iconfont设置 -->
			<i class="iconfont icon-previous" @click="back"></i>
		</div>
		<div class="head-title">{{ headTitle }}</div>
	</div>
</template>
<script>
	export default{
		name: 'vheader',
		data (){
			return{}
		},
		props: {
			headTitle: {
				type: String
			}
		},
		methods: {
			back (){
				this.$router.go(-1)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.header{
		background-color: black;
		position: fixed;
		left: 0;
		top: 0;
		height: 50px;
		width: 100%;
		z-index: 10;
		.head-title{
			width: 80%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin: 0 auto;
			height: 50px;
			line-height: 50px;
			text-align: center;
			color: #fff;
			font-size: 1.1rem;
		}
		.head-back{
			position: absolute;
			height: 100%;
			i{
				color: #fff;
				margin-left: 0.5rem;
			}
		}
	}
</style>