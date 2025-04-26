<template>
  <div class="schedule-container">
    <!-- Header: Period Selection and Icons -->
    <div class="header">
      <div class="period-selector">
        <span class="date-label">日期 :</span>
        <input type="date" v-model="selectedDate" class="date-input" />
        <div class="manual-date-inputs">
          <input type="number" v-model.number="selectedYear" placeholder="YYYY" class="year-input" />
          <span>年</span>
          <input type="number" v-model.number="selectedMonth" placeholder="MM" class="month-input" min="1" max="12" />
          <span>月</span>
          <input type="number" v-model.number="selectedDay" placeholder="DD" class="day-input" min="1" max="31" />
          <span>日</span>
        </div>
      </div>
      <div class="icons">
        <button class="icon-button" @click="prevPage" :disabled="isPrevDisabled">
          <svg width="31" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            style="transform: scaleX(-1);">
            <path opacity="0.7"
              d="M23.5891 13.5H0V10.5H23.5891L12.7391 2.1L15.5 0L31 12L15.5 24L12.7391 21.9L23.5891 13.5Z"
              :fill="isPrevDisabled ? '#cccccc' : '#1D1B20'" />
          </svg>
        </button>
        <button class="icon-button">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="find">
            <path
              d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z"
              fill="#1D1B20" />
          </svg>
        </button>
        <button class="icon-button" @click="nextPage" :disabled="isNextDisabled">
          <svg width="31" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="next">
            <path opacity="0.7"
              d="M23.5891 13.5H0V10.5H23.5891L12.7391 2.1L15.5 0L31 12L15.5 24L12.7391 21.9L23.5891 13.5Z"
              :fill="isNextDisabled ? '#cccccc' : '#1D1B20'" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Schedule Body -->
    <div class="schedule-body">
      <div v-for="nutritionist in displayedNutritionists" :key="nutritionist.id" class="schedule-column">
        <div class="person-header">
          <img :src="nutritionist.avatar" :alt="nutritionist.name" class="avatar" />
          <span class="person-name">{{ nutritionist.name }}</span>
        </div>
        <ul class="time-slots">
          <li v-for="time in nutritionist.schedule" :key="time" class="time-slot">
            {{ time }}
          </li>
        </ul>
      </div>
      <div v-if="displayedNutritionists.length === 0" class="no-data-message">
        暫無可預約時段
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';

import img1 from '@/assets/img/challenge_inner_pic/head/image1.png'
import img2 from '@/assets/img/challenge_inner_pic/head/image2.png'
import img3 from '@/assets/img/challenge_inner_pic/head/image3.png'

// Reactive state
const selectedDate = ref(new Date().toISOString().slice(0, 10));
const selectedYear = ref(null);
const selectedMonth = ref(null);
const selectedDay = ref(null);
const currentPage = ref(1);
const itemsPerPage = ref(3);

// Hardcoded schedule data (replace with backend data)
// TODO: get from backend based on selectedDate
const allNutritionists = ref([
  { id: 1, name: 'Anna', avatar: img1, schedule: ['09:00', '09:30', '10:00'] },
  { id: 2, name: 'Zara', avatar: img2, schedule: ['14:00', '14:30', '18:00', '19:00', '22:30', '23:00'] },
  { id: 3, name: 'Net', avatar: img3, schedule: ['08:00', '08:30', '10:00', '11:00', '11:30', '12:00', '13:00', '13:30', '14:00'] },
  { id: 4, name: 'Ben', avatar: img2, schedule: ['10:30', '11:00', '15:00'] },
  { id: 5, name: 'Chloe', avatar: img3, schedule: ['09:00', '14:00', '16:30'] },
  { id: 6, name: 'David', avatar: img1, schedule: ['11:30', '12:00', '17:00', '17:30'] },
  { id: 7, name: 'Eva', avatar: img3, schedule: ['10:00', '16:00'] },
]);

// Computed property for displayed nutritionists based on pagination
const displayedNutritionists = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return allNutritionists.value.slice(start, end);
});

// Computed properties for button disabling
const isPrevDisabled = computed(() => currentPage.value <= 1);
const isNextDisabled = computed(() => {
  const start = currentPage.value * itemsPerPage.value;
  return start >= allNutritionists.value.length;
});

// Methods
const updateManualInputsFromDate = () => {
  if (selectedDate.value) {
    const [year, month, day] = selectedDate.value.split('-').map(Number);
    selectedYear.value = year;
    selectedMonth.value = month;
    selectedDay.value = day;
  }
};

const updateDateFromManualInputs = () => {
  if (selectedYear.value && selectedMonth.value && selectedDay.value) {
    if (selectedMonth.value > 0 && selectedMonth.value <= 12 && selectedDay.value > 0 && selectedDay.value <= 31) {
      const year = selectedYear.value;
      const month = String(selectedMonth.value).padStart(2, '0');
      const day = String(selectedDay.value).padStart(2, '0');
      const newDate = `${year}-${month}-${day}`;
      if (selectedDate.value !== newDate) {
        selectedDate.value = newDate;
      }
    }
  }
};

const fetchSchedulesForDate = async (date) => {
  console.log(`Fetching schedules for ${date}...`);
  currentPage.value = 1;
};

const nextPage = () => {
  if (!isNextDisabled.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (!isPrevDisabled.value) {
    currentPage.value--;
  }
};

// Watchers
watch(selectedDate, (newDate, oldDate) => {
  if (newDate && newDate !== oldDate) {
    const [year, month, day] = newDate.split('-').map(Number);
    if (selectedYear.value !== year) selectedYear.value = year;
    if (selectedMonth.value !== month) selectedMonth.value = month;
    if (selectedDay.value !== day) selectedDay.value = day;
    fetchSchedulesForDate(newDate);
  }
});

watch([selectedYear, selectedMonth, selectedDay], () => {
  updateDateFromManualInputs();
});

// Lifecycle Hooks
onMounted(() => {
  updateManualInputsFromDate();
  fetchSchedulesForDate(selectedDate.value);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

.schedule-container {
  max-width: 600px;
  margin: 20px auto;
  overflow: hidden;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.period-selector {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 16px;
}

.date-label {
  font-family: 'Arial', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 140%;
  margin-right: 8px;
}

.date-input {
  border: 1px solid #a0aec0;
  border-radius: 16px;
  padding: 4px 8px;
  background-color: white;
  margin-right: 5px;
}

.manual-date-inputs {
  display: flex;
  align-items: center;
  gap: 4px;
}

.manual-date-inputs input {
  padding: 4px;
  border: 1px solid #a0aec0;
  border-radius: 4px;
  text-align: center;
}

.manual-date-inputs .year-input {
  width: 55px;
}

.manual-date-inputs .month-input,
.manual-date-inputs .day-input {
  width: 40px;
}

.manual-date-inputs span {
  margin: 0 2px;
}

.icons {
  display: flex;
  gap: 8px;
}

.icon-button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  font-size: 20px;
  color: #4a5568;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}

.icon-button:hover {
  color: #2d3748;
}

.icon-button:disabled svg path {
  fill: #cccccc;
  cursor: not-allowed;
}

.icon-button:disabled {
  cursor: not-allowed;
}

.schedule-body {
  display: flex;
  justify-content: space-around;
  gap: 16px;
  min-height: 250px;
  position: relative;
}

.schedule-column {
  flex: 1;
  text-align: center;
  padding: 0 8px;
}

.person-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
  margin-bottom: 8px;
}

.person-name {
  font-weight: 600;
}

.time-slots {
  list-style: none;
  padding: 0;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.time-slot {
  font-family: Inter;
  font-weight: 800;
  font-style: italic;
  font-size: 10px;
  line-height: 140%;
  display: inline-block;
  padding: 1px 1px;
  font-size: 14px;
  background-color: white;
  border: 1px solid #000000;
  border-radius: 16px;
  color: #2d3748;
  cursor: pointer;
  transition: background-color 0.2s;
  min-width: 70px;
  text-align: center;
}

.time-slot:hover {
  background-color: #edf2f7;
}

.no-data-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #555;
  font-size: 16px;
}

@media (max-width: 600px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .period-selector {
    width: 100%;
    justify-content: space-between;
  }

  .manual-date-inputs {
    margin-left: 0;
    margin-top: 5px;
    width: auto;
  }

  .icons {
    align-self: flex-end;
  }

  .schedule-body {
    flex-direction: column;
    align-items: center;
  }

  .schedule-column {
    width: 80%;
    margin-bottom: 20px;
  }
}

@media (max-width: 450px) {
  .period-selector {
    flex-direction: column;
    align-items: flex-start;
  }

  .manual-date-inputs {
    margin-top: 10px;
  }

  .date-input {
    width: calc(100% - 16px);
    margin-right: 0;
  }
}
</style>
