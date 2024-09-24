<template>
  <div>
    <h1>历史记录</h1>
    <canvas id="historyChart"></canvas>
    <vue-cal
      :events="calendarEvents"
      default-view="month"
      :disable-views="['years', 'year', 'week', 'day', 'agenda']"
      :cell-classes="getCellClasses"
    />
    <ul class="history-list">
      <li v-for="record in sortedBestScoresPerDay" :key="record.date">
        <span class="date">{{ record.date }}</span>
        <span class="score">{{ record.score }} cm</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'
import 'chartjs-adapter-date-fns'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
  name: 'JumpHistory',
  components: {
    VueCal
  },
  data() {
    return {
      historyData: [],
      sortedHistory: [],
      targetDistance: 150,
      calendarEvents: [],
      bestScoresPerDay: [],
      sortedBestScoresPerDay: []
    }
  },
  methods: {
    fetchHistoryData() {
      this.historyData = JSON.parse(localStorage.getItem('historyData')) || []
      this.targetDistance = localStorage.getItem('targetDistance') || 150
    },
    sortHistoryData() {
      this.sortedHistory = this.historyData.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
    },
    getBestScoresPerDay() {
      const bestScores = {}
      this.historyData.forEach(record => {
        if (!bestScores[record.date] || bestScores[record.date] < record.score) {
          bestScores[record.date] = record.score
        }
      })
      this.bestScoresPerDay = Object.keys(bestScores).map(date => ({ date, score: bestScores[date] }))
      this.sortedBestScoresPerDay = this.bestScoresPerDay.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
    },
    renderChart() {
      const ctx = document.getElementById('historyChart').getContext('2d')
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.bestScoresPerDay.map(record => record.date),
          datasets: [
            {
              label: '成绩 (cm)',
              data: this.bestScoresPerDay.map(record => record.score),
              borderColor: '#FFAB40', /* 明亮的橙色 */
              borderWidth: 2,
              fill: false
            },
            {
              label: '目标成绩 (cm)',
              data: this.bestScoresPerDay.map(() => this.targetDistance),
              borderColor: '#F50057', /* 紫红色 */
              borderWidth: 2,
              borderDash: [5, 5],
              fill: false
            }
          ]
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day'
              }
            },
            y: {
              beginAtZero: true
            }
          }
        }
      })
    },
    generateCalendarEvents() {
      this.calendarEvents = this.historyData.map(record => ({
        start: record.date,
        end: record.date,
        title: `成绩: ${record.score} cm`
      }))
    },
    getCellClasses({ date }) {
        
      const hasEvent = this.calendarEvents.some(event => event.start === date)
      return hasEvent ? 'has-event' : ''
    }
  },
  mounted() {
    this.fetchHistoryData()
    this.sortHistoryData()
    this.getBestScoresPerDay()
    this.renderChart()
    this.generateCalendarEvents()
  }
}
</script>

<style scoped>
.history-list {
  list-style-type: none;
  padding: 0;
  margin-bottom: 60px; /* 确保列表和底部Tab不重叠 */
}

.history-list li {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.history-list .date {
  text-align: left;
}

.history-list .score {
  text-align: right;
}

.vuecal {
  margin-bottom: 20px;
}

#historyChart {
  margin-bottom: 20px; /* 确保图表和底部Tab不重叠 */
}

/* 使用更高的特异性来覆盖原来的样式 */
.vuecal :deep(.vuecal__cell-events-count) {
  background-color: #FF0000 !important; /* 红色背景 */
  color: white !important; /* 白色文字 */
  border-radius: 50% !important; /* 圆形 */
  width: 18px !important; /* 设置固定宽度 */
  height: 18px !important; /* 设置固定高度 */
  line-height: 18px !important; /* 垂直居中文字 */
  font-size: 12px !important; /* 调整文字大小 */
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

/* 为有事件的日期单元格添加红色边框 */
.vuecal :deep(.vuecal__cell.has-event) {
  border: 2px solid #FF0000 !important;
}
</style>