import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

/*webpack中利用require.ensure()实现按需加载*/
var home = r => require.ensure([], () => r(require('@/components/home')), 'home')
var article = r => require.ensure([], () => r(require('@/components/varticle')), 'article')
var carousel = r => require.ensure([], () => r(require('@/components/carousel')), 'carousel')
var comment = r => require.ensure([], () => r(require('@/components/comment')), 'comment')
var topic = r => require.ensure([], () => r(require('@/components/topic')), 'topic')
var video = r => require.ensure([], () => r(require('@/components/video')), 'video')

Vue.use(Router)

const routes = [
    {
      path: '/',
      component: App,
      children: [
      	{
      		path: '',
      		redirect: '/home'
      	},
      	{
      		path: '/home',
      		component: home,
          children: [
            {
              path: 'article',
              component: article
            },
            {
              path: 'carousel',
              component: carousel
            },
            {
              path: 'video',
              component: video
            }
          ]
      	},
        {
          path: '/comment',
          component: comment
        },
        {
          path: '/topic',
          component: topic,
          children: [
            {
              path: 'carousel',
              component: carousel
            },
            {
              path: 'article',
              component: article
            },
            {
              path: 'video',
              component: video,
            }
          ]
        }
      ]
    }
  ];
const router =  new Router({
  routes: routes,
  mode: 'hash',
  strict: process.env.NODE_ENV !== 'production'
})
/*
process.env 是读取系统环境变量的，
比如你在启动服务的时候，
设置环境变量为production或者development，
那么在程序里面就可以通过process.env.ENVNAME获取，
因为你在node命令窗口启动时没有设置相关的环境变量，
所以就没办法获取到了，你可以试一下
NODE_ENV=development node来启动命令窗口，
然后应该就可以获取到了
*/
export default router;
