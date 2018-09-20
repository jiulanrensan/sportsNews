import Vue from 'vue'
import router from '../router'
import axios from 'axios'

//对axios进行配置，然后在用到axios请求的文件中导入

//axios库默认的请求时长为1000，这里修改默认设置
axios.defaults.timeout = 30000;
//全局的 axios 默认值
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.prototype.$ajax = axios;