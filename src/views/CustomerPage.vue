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
        <bookkeepingComp :charData="userDataChart" />

      </div>
      <div class="analyze">
        <p class="title">預約營養師</p>
      </div>
      <div class="analyze">
        <p class="title">健康建議</p>
        <button class="analyze-button">一鍵分析</button>
        <PieChartComp :charData="userDataPie" />


      </div>
      <div class="analyze">
        <p class="title">健康保單申請</p>
        <button class="analyze-button">一鍵分析</button>
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

<style>
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

.analysis {
  width: 100%;
  height: 1905px;
  display: grid;
  grid-template-columns: repeat(2, 3fr);
  grid-template-rows: repeat(2, 500pxpx);
}

/* .analyze {
  widht
} */

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
