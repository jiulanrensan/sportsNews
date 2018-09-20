<template>
	<div>
		<!-- 
			通过v-show决定是否显示
			loadstatus默认为false,即不显示
			 -->
		<div class="loadmore" v-show="!loadstatus">
			正在加载...
		</div>
		<div class="loadnone" v-show="loadstatus">
			加载完毕
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		name: 'loading',
		data (){
			return {}
		},
		props: {
			//父组件传入loadstatus，在这里定义
			//定义类型和默认值
			loadstatus: {
				type: Boolean,
				default: false
			}
		}
	}
</script>
<style></style>