import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VueFilterDateFormat from 'vue-filter-date-format';

Vue.config.productionTip = false;

Vue.use(VueFilterDateFormat);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
