<template>
  <div class="home-container">
    <div class="app-header">
      <img src="@/assets/jump-icon.png" alt="App Icon" class="app-icon" />
      <h1>{{ welcomeMessage }}</h1>
    </div>
    <h2 class="best-score">当前最好成绩: {{ bestScore }} cm 🏆</h2>
    <h2>目标距离: {{ targetDistance }} cm 🎯</h2>
    <div class="input-container">
      <div class="input-group">
        <input v-model="newScoreMeters" type="number" placeholder="米" class="input-field" />
        <span class="input-unit">米</span>
      </div>
      <div class="input-group">
        <input v-model="newScoreCentimeters" type="number" placeholder="厘米" class="input-field" />
        <span class="input-unit">厘米</span>
      </div>
    </div>
    <button @click="recordScore" class="record-button">
      <i class="fas fa-save"></i> 录入
    </button>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      bestScore: 0,
      targetDistance: 0,
      newScoreMeters: 1,
      newScoreCentimeters: 0,
      welcomeMessage: ''
    }
  },
  methods: {
    recordScore() {
      const newScore = this.newScoreMeters * 100 + this.newScoreCentimeters
      const newRecord = {
        date: new Date().toISOString().split('T')[0],
        score: newScore
      }
      let historyData = JSON.parse(localStorage.getItem('historyData')) || []
      historyData.push(newRecord)
      localStorage.setItem('historyData', JSON.stringify(historyData))
      localStorage.setItem('lastUpdated', Date.now())
      this.updateBestScore(historyData)
      this.$router.push('/history')
    },
    updateBestScore(historyData) {
      this.bestScore = Math.max(...historyData.map(record => record.score))
    },
    generateWelcomeMessage() {
      const userId = localStorage.getItem('userId') || 'Rex'
      const messages = [
        `${userId}，你又来跳远，勤奋的你会越跳越远！`,
        `${userId}，继续加油，你的努力会有回报！`,
        `${userId}，每一次跳跃都是进步的一步！`,
        `${userId}，相信自己，你会越来越好！`
      ]
      this.welcomeMessage = messages[Math.floor(Math.random() * messages.length)]
    }
  },
  mounted() {
    this.targetDistance = localStorage.getItem('targetDistance') || 150
    const historyData = JSON.parse(localStorage.getItem('historyData')) || []
    this.updateBestScore(historyData)
    this.generateWelcomeMessage()
  }
}
</script>

<style scoped>
.home-container {
  text-align: center;
  padding: 20px;
  background-color: #F5F5F5; /* 柔和的灰白色 */
}

.app-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.app-icon {
  width: 100px;
  height: 100px;
}

.best-score {
  font-size: 24px;
  font-weight: bold;
  color: #FF6F61; /* 明亮的橙色 */
}

.input-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.input-group {
  display: flex;
  align-items: center;
  margin: 0 5px;
}

.input-field {
  width: 80px;
  padding: 10px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.input-unit {
  margin-left: 5px;
  font-size: 18px;
}

.record-button {
  background-color: #69F0AE; /* 薄荷绿 */
  color: white;
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.record-button i {
  margin-right: 5px;
}
</style>