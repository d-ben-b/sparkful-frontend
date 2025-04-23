<template>
  <div class="container">
    <div class="upper">
      <img :src="VIPcustomer" alt="" class="VIPcustomer" />
      <div v-for="(text, index) in buttons" :key="index" class="border" :class="`box-${index + 1}`">
        <img :src="VIPbutton" alt="" />
        <button class="selection" @click="useGoto('customer-page')">{{ text }}</button>
      </div>
    </div>

    <div class="analysis">
      <div class="analyze">
        <p class="title">財務建議</p>
        <button class="analyze-button">一鍵分析</button>
        <bookkeepingComp :charData="userDataChart" class="chart" />
      </div>
      <div class="analyze">
        <p class="title">預約營養師</p>
        <BookingNutritionist />
      </div>
      <div class="analyze">
        <p class="title">健康建議</p>
        <button class="analyze-button">一鍵分析</button>
        <PieChartComp :charData="userDataPie" class="chart" />


      </div>
      <div class="analyze">
        <ApplyComp class="apply-chart" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VIPcustomer from '@/assets/img/VIP/VIPcustomer.png'
import VIPbutton from '@/assets/img/VIP/VIPbutton.png'
import PieChartComp from '@/components/PieChartComp.vue'
import bookkeepingComp from '@/components/bookkeepingComp.vue'
import BookingNutritionist from '@/components/BookingNutritionist.vue'
import ApplyComp from '@/components/ApplyComp.vue'

const buttons = ref([
  '財務建議',
  '健康保單申請',
  '健康建議',
  '健康信用下載',
  '預約營養師',
])

//TODO get from backend
const userDataChart = ref({
  categories: ['25年1月', '25年2月', '25年3月', '25年4月', '25年5月'],
  income: [12.5, 3.4, 4.2, 6.0, 5.2],
  expense: [1.0, 1.2, 3.3, 6.0, 2.8],
})
const userDataPie = ref({
  protein: 30,
  starch: 30,
  cellulose: 40,
})
</script>

<style scoped>
.upper {
  display: grid;
  width: 100%;
  height: 284px;
  grid-template-columns: repeat(6, 3fr);
  grid-template-rows: repeat(3, 33%);
  align-items: center;
  background: #91ad6f;
  justify-items: start;
}

.apply-chart {
  position: absolute;
  top: 0;
  width: 100%;
  box-sizing: border-box;
}

.analyze-button {
  position: absolute;
  z-index: 2;
  cursor: pointer;
  margin-left: 500px;
  margin-top: 5px;
  width: 83px;
  height: 40px;
  border-radius: 100px;
  background: #719F6C;
  border: none;
  color: #ffffff;
  font-family: 'Arial', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
}

.analyze-button:hover {
  background-color: #5a9a54;
  /* hover:bg-green-600 */
}

.chart {
  position: absolute;
  width: 595px;
  height: 346px;
  top: 100px !important;
  margin-left: 72px;
}

.title {
  margin-left: 49px;
  font-family: 'Kaisei HarunoUmi', sans-serif;
  font-weight: 400;
  font-size: 30px;
  line-height: 100%;
  letter-spacing: 0%;
}

.analysis {
  width: 100%;
  height: 1905px;
  display: grid;
  grid-template-columns: repeat(2, 3fr);
  grid-template-rows: repeat(2, 500px);
}

.analyze {
  position: relative;
}

.box-1 {
  grid-row: 1;
  grid-column-start: 3;
  grid-column-end: 5;
}

.box-2 {
  grid-row: 1;
  grid-column-start: 5;
  grid-column-end: 9;
}

.box-3 {
  grid-row: 2;
  grid-column-start: 3;
  grid-column-end: 5;
}

.box-4 {
  grid-row: 2;
  grid-column-start: 5;
  grid-column-end: 9;
}

.box-5 {
  grid-row: 3;
  grid-column-start: 3;
  grid-column-end: 5;
}

.box-6 {
  grid-row: 3;
  grid-column-start: 5;
  grid-column-end: 9;
}

.selection {
  cursor: pointer;
  width: 100%;
  font-family: Kaisei Decol;
  font-weight: 400;
  font-size: 30px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #ffffff;
  background: transparent;
  border: none;
  text-align: left;
}

.border {
  display: flex;
}

.border img {
  width: 63px;
  height: 63px;
}

.VIPcustomer {
  width: 213px;
  grid-column: 1;
  grid-row-start: 1;
  grid-row-end: 5;
}

.upper .title {
  grid-column: 10;
  grid-row-start: 1;
  grid-row-end: 4;
  writing-mode: vertical-rl;
  font-family: Kaisei Decol;
  font-weight: 400;
  font-size: 19px;
  line-height: 100%;
  color: #fff;
  letter-spacing: 0.5em;
  white-space: nowrap;
  justify-self: end;
  margin-right: 50px;
  text-align: center;
}
</style>
