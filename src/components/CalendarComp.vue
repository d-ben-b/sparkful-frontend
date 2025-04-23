<template>
  <div @wheel="handleScroll" class="container">
    <div class="title">
      <span>{{ year }}.{{ month + 1 }}</span>
    </div>
    <table class="calendar" :data-title="`${year}-${String(month + 1).padStart(2, '0')}`">
      <thead>
        <tr>
          <th>日</th>
          <th>一</th>
          <th>二</th>
          <th>三</th>
          <th>四</th>
          <th>五</th>
          <th>六</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, index) in weeks" :key="index">
          <td
            v-for="(day, idx) in week"
            :key="idx"
            :class="{ today: isToday(day), event: hasEvent(day) }"
            @click="emitData(day)"
          >
            {{ day }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['toggle-emit'])

const year = ref(new Date().getFullYear())
const month = ref(new Date().getMonth()) // 月份從 0 開始(0 = 一月)

const props = defineProps({
  userData: {
    type: Array,
    required: true,
    default: () => [{}],
  },
})

// 處理滾輪事件
const handleScroll = (event) => {
  event.preventDefault() // 阻止事件冒泡
  if (event.deltaY > 0) {
    nextMonth()
  } else {
    prevMonth()
  }
}

// 切換到下一個月
const nextMonth = () => {
  if (month.value === 11) {
    month.value = 0
    year.value++
  } else {
    month.value++
  }
}

// 切換到上一個月
const prevMonth = () => {
  if (month.value === 0) {
    month.value = 11
    year.value--
  } else {
    month.value--
  }
}

// 將 userData 轉換為日期對應的事件映射
const eventMap = computed(() => {
  const map = {}
  props.userData.forEach((data) => {
    Object.values(data).forEach((event) => {
      map[event.date] = event.event
    })
  })
  return map
})

const hasEvent = (day) => {
  if (!day) return false
  const dateKey = `${year.value}-${String(month.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  return eventMap.value[dateKey] !== undefined
}

const weeks = computed(() => {
  const weeks = []
  const firstDay = new Date(year.value, month.value, 1)
  const daysInMonth = new Date(year.value, month.value + 1, 0).getDate()
  const startDay = firstDay.getDay() // 0（日）~6（六）
  let date = 1
  let week = new Array(7).fill('')

  // 填入第一週：前面空白，後面開始填日期
  for (let i = startDay; i < 7; i++) {
    week[i] = date++
  }
  weeks.push(week)

  // 填入接下來的週數
  while (date <= daysInMonth) {
    week = new Array(7).fill('')
    for (let i = 0; i < 7 && date <= daysInMonth; i++) {
      week[i] = date++
    }
    weeks.push(week)
  }

  return weeks
})

const isToday = (day) => {
  if (!day) return false
  const today = new Date()
  return (
    day === today.getDate() &&
    month.value === today.getMonth() &&
    year.value === today.getFullYear()
  )
}
const emitData = (day) => {
  emit(
    'toggle-emit',
    `${year.value}-${String(month.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
  )
}
</script>

<style scoped>
.container {
  position: relative;
  width: 595px;
  height: 346px;
  border-radius: 30px;
  background-color: #e6f2e6;
}

.title {
  position: relative;
  width: 58px;
  height: 20px;
  top: 74px;
  left: 23px;
}

table {
  color: #000000;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  letter-spacing: -0.23px;
  text-align: center;
  vertical-align: middle;
}

table.calendar {
  position: relative;
  top: 34px;
  border-collapse: collapse;
  width: 100%;
  max-width: 400px;
  margin: auto;
  border-radius: 30px;
}

table.calendar th,
table.calendar td {
  padding: 8px;
  text-align: center;
  width: 24px;
  height: 33px;
  padding: 0;
}

.today {
  background: #e0f1cc80;
  font-weight: bold;
  border-radius: 50px;
}

.event {
  background: #ffcf4b;
  color: #000000;
  font-weight: bold;
  border-radius: 50px;
}
</style>
