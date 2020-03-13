import Vue from 'vue';
import App from './App.vue';
import { Locale } from 'vant';
import zhCN from 'vant/lib/locale/lang/zh-CN';

Locale.use('zh-CN', zhCN);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
