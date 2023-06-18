import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import App from './App.vue';
import FlowOverview from './components/FlowOverview.vue';
import AttackChain from './components/AttackChain.vue';

const routes = [
    { path: '/operation-1', component: FlowOverview },
    { path: '/operation-2', component: AttackChain },
  // 其他路由配置
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.mount('#app');
