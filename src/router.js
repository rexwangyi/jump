import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './views/Home.vue'
import JumpHistory from './views/JumpHistory.vue'
import SettingPage from './views/Setting.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/history', component: JumpHistory },
  { path: '/setting', component: SettingPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router