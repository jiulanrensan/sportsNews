<template>
	<div class="commentlist">
		<!-- 热评内容 -->
		<div class="list-item" v-for="(item,index) in commentdata" :key="index">
			<!-- 可以在{{}}里面进行判断 -->
			<div class="user">
				{{ item.ip_from ? item.ip_from : item.client_ip }}
				<span>{{ item.uname }}</span>
			</div>
			<div class="content">
				<div class="con">{{ item.comment_contents }}</div>
				<div class="parent" v-if="item.parent.length">
					{{ item.parent[0].comment_contents }}
				</div>
			</div>
			<div class="other">
				<div class="time">{{ item.comment_date }}</div>
				<div class="uptimes">赞{{ item.uptimes }}</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'commentlist',
		data(){
			return {}
		},
		props: {
			//父组件传入子组件的数据
			commentdata: {
				type: Array,
				//默认值为什么要用函数形式？
				default: function(){
					return []
				}
			}
		}
	}
</script>
<style scoped lang="scss">
	.commentlist{
		padding: 1rem 0;
		
		.list-item{
			padding-top: 20px;
			border-bottom: 1px solid #eee;
			.user{
				font-size: 13px;
				margin-bottom: 10px;
			}
			.content{
				min-height: 100px;
				height: auto;
				margin-bottom: 10px;
				.parent{
					border: 1px solid #ccc;
					color: #666;

				}
			}
			.other{
				display: flex;
				justify-content: space-between;
				.time{
					font-size: 13px;
				}
				.uptimes{
					font-size: 15px;
				}
			}
		}
		
	}
</style>