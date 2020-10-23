import './app.scss';
import Vue from 'vue';
import App from './App.vue';
import routes from './routes';
import VueRouter from 'vue-router';
import request from './utils/request';
import { Table, TableColumn, Input, Button, Dialog, Card } from 'element-ui';

Vue.use(Input);
Vue.use(Table);
Vue.use(Dialog);
Vue.use(Card);
Vue.use(Button);
Vue.use(TableColumn);
Vue.config.productionTip = false;

// $http
Vue.prototype.$http = request;

// use router
Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#chain-app');
