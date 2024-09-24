<template>
  <div id="app">
    <router-view />
    <nav>
      <router-link to="/" class="home-tab"><i class="fas fa-home"></i> Home</router-link>
      <router-link to="/history" class="history-tab"><i class="fas fa-history"></i> History</router-link>
      <router-link to="/setting" class="setting-tab"><i class="fas fa-cog"></i> Setting</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

body {
  background-color: #F5F5F5; /* 柔和的灰白色 */
  color: #333; /* 深色文字 */
}

nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #40C4FF; /* 电光蓝 */
  padding: 0;
}

nav a {
  color: #333; /* 深色文字 */
  text-decoration: none;
  font-size: 18px;
  padding: 15px 0;
  flex: 1;
  text-align: center;
  border-right: 1px solid #40C4FF;
}

nav a:last-child {
  border-right: none;
}

nav i {
  margin-right: 5px;
}

.home-tab {
  background-color: #FFAB40; /* 明亮的橙色 */
}

.history-tab {
  background-color: #FFEB3B; /* 亮黄色 */
}

.setting-tab {
  background-color: #69F0AE; /* 薄荷绿 */
}
</style>
