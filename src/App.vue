<template>
  <div>
    <transition name="fade">
      <!-- 在router-view里显示 -->
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  	/*遇到的问题
		1.tool.js中geturl中返回type,加split不是多此一举？
		2.点击typelist自定义函数，此函数的命名
    3.swier的onTransitionEnd函数不起作用？
	*/
}
</script>

<style lang="scss">
  @import './style/common.scss'
  
</style>
