<template>
  <div class="setting-container">
    <h1>设置</h1>
    <div class="form-group">
      <label for="userId">用户ID:</label>
      <select v-model="userId" class="form-control">
        <option value="Rex">Rex</option>
        <option value="William">William</option>
      </select>
    </div>
    <div class="form-group">
      <label for="targetDistance">目标距离 (cm):</label>
      <input v-model="targetDistance" type="number" class="form-control" />
    </div>
    <div class="form-group">
      <label for="historyDays">显示历史数据的天数:</label>
      <input v-model="historyDays" type="number" class="form-control" />
    </div>
    <div class="button-group">
      <button @click="saveSettings" class="save-button">
        <i class="fas fa-save"></i> 保存设置
      </button>
      <button @click="syncData" class="sync-button">
        <i class="fas fa-sync-alt"></i> 同步数据
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingPage',
  data() {
    return {
      userId: 'Rex',
      targetDistance: 150,
      historyDays: 30,
      jsonBinUrl: 'https://api.jsonbin.io/v3/b/66f14819e41b4d34e4357765',
      jsonBinMasterKey: '$2b$10$kYQym0oNS90VerYUJSrDFeExy4xkpxBVcsXF/Gd4xtgwGbxHa/tr6',
      jsonBinAccessKey: '$2b$10$U60gGuGLpLxxTLNWvenzTueQcqbPHbAv.fQH0/.qNMkWb1idDjrC6'
    }
  },
  methods: {
    saveSettings() {
      localStorage.setItem('userId', this.userId)
      localStorage.setItem('targetDistance', this.targetDistance)
      localStorage.setItem('historyDays', this.historyDays)
      alert('设置已保存')
    },
    async syncData() {
      const localData = JSON.parse(localStorage.getItem('historyData')) || []
      const localLastUpdated = localStorage.getItem('lastUpdated') || 0

      try {
        const response = await fetch(this.jsonBinUrl, {
          headers: {
            'X-Master-Key': this.jsonBinMasterKey,
            'X-Access-Key': this.jsonBinAccessKey
          }
        })
        const jsonData = await response.json()
        const serverData = jsonData.record.historyData || []
        const serverLastUpdated = jsonData.record.lastUpdated || 0

        if (localLastUpdated > serverLastUpdated) {
          // 本地数据较新，覆盖服务器数据
          await fetch(this.jsonBinUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'X-Master-Key': this.jsonBinMasterKey,
              'X-Access-Key': this.jsonBinAccessKey
            },
            body: JSON.stringify({
              historyData: localData,
              lastUpdated: localLastUpdated
            })
          })
          alert('数据已同步到服务器')
        } else {
          // 服务器数据较新，覆盖本地数据
          localStorage.setItem('historyData', JSON.stringify(serverData))
          localStorage.setItem('lastUpdated', serverLastUpdated)
          alert('数据已从服务器同步')
        }
      } catch (error) {
        console.error('同步数据时出错:', error)
        alert('同步数据时出错，请稍后再试')
      }
    }
  },
  mounted() {
    this.userId = localStorage.getItem('userId') || 'Rex'
    this.targetDistance = localStorage.getItem('targetDistance') || 150
    this.historyDays = localStorage.getItem('historyDays') || 30
  }
}
</script>

<style scoped>
.setting-container {
  padding: 20px;
  background-color: #F5F5F5; /* 柔和的灰白色 */
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.save-button, .sync-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4DBA87;
  color: white;
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.sync-button {
  background-color: #F50057; /* 紫红色 */
}

.save-button i, .sync-button i {
  margin-right: 5px;
}
</style>