// 配置路由

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('./Home.vue'),
  },
];

export default routes;
