import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import App from './App.vue';
import Knowledg from './components/KnowledgeRepoSvchost.vue';
import LogGraph from './components/AlertGraph.vue';
import RawLog from './components/LogAnalytics.vue'
import SelectedLog from './components/LogProcess.vue'
import AlertGraph from './components/AlertComponent.vue'

const routes = [
    { path: '/operation-1', component: RawLog },
    { path: '/operation-2', component: SelectedLog },
    { path: '/operation-3', component: LogGraph },
    { path: '/operation-4', component: Knowledg },
    { path: '/operation-5', component: AlertGraph },
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
