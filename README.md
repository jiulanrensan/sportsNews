# sport-news
### 技术栈
* node.js环境
* webpack
* vue全家桶
* axios
* scss
* vue-infinite-scroll
* vue-awesome-swiper

### 简单总结
#### 1. 基于swiper4实现轮播效果
在做轮播图详情页的时候，想让文字跟随图片一起变化，于是用到了`slideChangeTransitionEnd`这个回调函数，在图片滚动结束之后触发。原本在data里面定义了swiperOption:{...}以及其属性，但在里面使用这个回调函数，发现没起作用。上网查了资料，改成如下：
```
computed: {  
  swiper() {  
    return this.$refs.mySwiper.swiper;  
  }
}, 
mounted(){
  let _this = this;
  this.swiper.on('slideChangeTransitionEnd', function(){
    _this.current = this.realIndex + 1;
    _this.des = _this.imglist[this.realIndex].description;
  });
},
```
响应成功~
#### 2. 控制某个页面跳转效果
```
//用watch监听路由变化
//to:要跳转到的页面
//from:离开的页面
watch: {
  '$route' (to,from){
    //此处是判断即将跳转的页面是否是视频，来决定样式
    //再在css中定义这两个过渡属性
    this.transitionName = to.path.indexOf("video")>0 ? 'router-right' : 'router-slide'
  }
}
```
下面这个判断`/`多少来决定页面跳转方式
```
watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length；
    const fromDepth = from.path.split('/').length；
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'；
}
```
#### 3. infiniteScroll实现滚动加载
```
<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
  ...
</div>
<loading :loadstatus="loadstatus"></loading>
```
`infinite-scroll-disabled="busy"`表示由变量busy决定是否执行loadMore，false则执行

`infinite-scroll-distance="20"`这里20决定了页面滚动到离页尾多少像素的时候触发回调函数，20是像素值,在页尾做了一个loading，当触发loadeMore时显示

定义loadMore函数:
```
//使用async await处理异步，确保在axios获取数据完成之后再进行渲染
async loadMore(){
  this.busy = true;
  let response = await getNews('TY43',this.page++,'5.4.0');
  //扩展运算符，把数组元素用逗号分开
  //即把之前的和新的数组元素重新放进new.item里渲染
  this.news.item = [...this.news.item,...response.data[0].item];
  console.log(this.news.item);
  this.busy = false;
},
```
#### 4. webpack实现按需加载
```
//router中定义好模块名字，然后在路由中引用
/*webpack中利用require.ensure()实现按需加载*/
var home = r => require.ensure([], () => r(require('@/components/home')), 'home')
var article = r => require.ensure([], () => r(require('@/components/varticle')), 'article')
var carousel = r => require.ensure([], () => r(require('@/components/carousel')), 'carousel')
var comment = r => require.ensure([], () => r(require('@/components/comment')), 'comment')
var topic = r => require.ensure([], () => r(require('@/components/topic')), 'topic')
var video = r => require.ensure([], () => r(require('@/components/video')), 'video')
```

#### 5. proxyTable解决开发环境中的跨域问题
```
/*
这段代码的效果就是将本地8080端口的一个请求代理到了https://api.iclient.ifeng.com/这一域名下
http://localhost:8080/api => https://api.iclient.ifeng.com/
*/
proxyTable: {
  '/iclient': {
    target: 'https://api.iclient.ifeng.com/', //目标接口域名
    changeOrigin: true,  //true为跨域
    pathRewrite: {
      '^/iclient': '' //重写接口
    }
  }
}
```
#### 6. 使用手机预览效果
1. 电脑和手机在同一个局域网内，即使用同一个wifi
2. WIN+R，cmd回车，打开命令提示符，输入ipconfig，查看本地IPv4
3. 找到项目中config/index.js,将host: ‘localhost’改为本地IPv4地址
4. npm run dev之后在手机输入 `http://ip地址:端口号`即可

效果图：

GIF：

<img width="30%" src="https://github.com/jiulanrensan/sportsNews/blob/master/Screenrecorder-2018-09-25-23-30-40-705.mp4_1540806651.gif">

首页：

<img width="30%" src="https://github.com/jiulanrensan/sportsNews/blob/master/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20181125191342.png">

轮播图详情页：

<img width="30%" src="https://github.com/jiulanrensan/sportsNews/blob/master/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20181125191413.png">

评论详情页：

<img width="30%" src="https://github.com/jiulanrensan/sportsNews/blob/master/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20181125191502.png">
## Build Setup

``` bash
# 安装依赖
npm install

# 运行，浏览器输入localhost:8081
npm run dev

# 打包
npm run build

```

