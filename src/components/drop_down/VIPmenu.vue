<template>
  <div class="container">
    <div class="custom-menu">
      <img :src="VIPcustomer" alt="" class="VIPcustomer">
      <div v-for="(text, index) in buttons[0]" :key="index" class="border" :class="`box-${index + 1}`">
        <img :src="VIPbutton" alt="">
        <button class="selection">{{ text }}</button>
      </div>
      <p class="title">
        超級吃貨
      </p>
      <svg class="bg" width="1250" height="284" viewBox="0 0 1250 284" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H1150C1205.23 0 1250 44.7715 1250 100V184C1250 239.228 1205.23 284 1150 284H0V0Z" fill="#91AD6F" />
      </svg>
    </div>

    <div class="shop-menu">
      <img :src="VIPshop" alt="" class="VIPcustomer">
      <div v-for="(text, index) in buttons[1]" :key="index" class="border" :class="`box-${index + 1}`">
        <img :src="VIPbutton" alt="">
        <button class="selection">{{ text }}</button>
      </div>

      <p class="title top-50">
        超級供應商
      </p>
      <svg class="bg2" width="1248" height="288" viewBox="0 0 1248 288" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H1148C1203.23 0 1248 44.7715 1248 100V188C1248 243.228 1203.23 288 1148 288H0V0Z" fill="#91AD6F" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VIPbutton from '@/assets/img/VIP/VIPbutton.png';
import VIPcustomer from '@/assets/img/VIP/VIPcustomer.png';
import VIPshop from '@/assets/img/VIP/VIPshop.png';

const buttons = ref([
  ['健康建議', '財務建議', '預約營養師分析', '健康理財帳戶申請', '健康保單申請', '健康紀錄下載'],
  ['品牌合作', '廣告投放', '優惠設定', '金融機關合作', '保險機關合作', '營養師合作'],
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kaisei+Decol:wght@400&display=swap');

.container {
  z-index: 100;
  position: absolute;
  top: 129px;
  left: 0;
  width: 100%;
}

.custom-menu,
.shop-menu {
  position: relative;
  width: 100%;
  height: 284px;
  display: grid;
  grid-template-columns: repeat(10, 125px);
  grid-template-rows: repeat(3, 1fr);
  align-items: center
}

.shop-menu {
  margin-top: 20px;
}

.box-1 {
  grid-row: 1;
  grid-column-start: 3;
  grid-column-end: 6;
}

.box-2 {
  grid-row: 1;
  grid-column-start: 6;
  grid-column-end: 9;
}

.box-3 {
  grid-row: 2;
  grid-column-start: 3;
  grid-column-end: 6;
}

.box-4 {
  grid-row: 2;
  grid-column-start: 6;
  grid-column-end: 9;
}

.box-5 {
  grid-row: 3;
  grid-column-start: 3;
  grid-column-end: 6;
}

.box-6 {
  grid-row: 3;
  grid-column-start: 6;
  grid-column-end: 9;
}

.w-600 {
  width: 608px;
}

.w-500 {
  width: 500px;
}

.selection {
  width: 100%;
  font-family: Kaisei Decol;
  font-weight: 400;
  font-size: 30px;
  line-height: 100%;
  letter-spacing: 0%;
  background: transparent;
  border: none;
  text-align: left;
}

.VIPcustomer {
  width: 190px;
  grid-column: 1;
  grid-row-start: 1;
  grid-row-end: 5;
}

.border {
  display: flex;
}

.border img {
  width: 63px;
  height: 63px;
}

.custom-menu .title,
.shop-menu .title {
  grid-column: 10;
  grid-row-start: 1;
  grid-row-end: 4;
  writing-mode: vertical-rl;
  font-family: Kaisei Decol;
  font-weight: 400;
  font-size: 19px;
  line-height: 100%;
  color: #FFF;
  letter-spacing: 0.5em;
  white-space: nowrap;
  justify-self: end;
  margin-right: 50px;
  text-align: center;
}

.bg {
  position: absolute;
  left: 0;
  z-index: -1;
  top: 0px;
}

.bg2 {
  position: absolute;
  left: 0;
  z-index: -1;
}

.title {
  right: 0;
  writing-mode: vertical-rl;
  width: 50px;
  height: 123px;
  top: 347.96px;
  font-family: Kaisei Decol;
  font-weight: 400;
  font-size: 19px;
  line-height: 100%;
  color: #FFF;
  letter-spacing: 0.2em;
}
</style>
