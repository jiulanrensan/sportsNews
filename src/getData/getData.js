import axios from 'axios'
import '../config/http.js'
import { iclienturl,ifeng3gurl,commenturl } from '../config/env.js'

//输入获取api函数
export const getNews = (id,page,gv) => axios.post(iclienturl+'ClientNews?id='+id+'&page='+page+'&gv='+gv)
//新闻文章&&专题
export const getarticle = (url) => axios.post(iclienturl+url)
//轮播图
export const getcarousel = (url) => axios.get(ifeng3gurl+url)
// 热评
export const hotcomment = (page,url) => axios.get(commenturl+'/get?job=1&orderby=uptimes&order=DESC&p='+page+'&docurl='+url)
// 最新评论
export const newcomment = (page,url) => axios.post(commenturl+ '/get?job=1&order=DESC&orderBy=create_time&p='+page+'&docurl='+url)
//首页新闻视频
export const videoitem = (guid) => axios.post(iclienturl+'api_phoenixtv_details?guid='+guid)
