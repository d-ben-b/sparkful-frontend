<template>
  <div class="container">
    <div class="button-border">
      <button
        class="button b0"
        :style="{
          backgroundImage: `url(${buttonImages[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      >
        我的積福幣 :
        <p class="coin green">{{ eatCoin }}</p>
        /
        <p class="coin">NT{{ eatCoin / eat2NT }} $</p>
      </button>
    </div>
    <div class="button-border" v-for="(button, index) in buttons" :key="index">
      <button
        class="button"
        :class="`b${index + 1}`"
        @click="handleClick(button)"
        :style="{
          backgroundImage: `url(${buttonImages[index + 1]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      >
        {{ button }}
      </button>
    </div>
    <div class="button-border">
      <img :src="`${imgSrc(background)}`" alt="" class="background" />
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import b0 from '@/assets/img/hamburger/b0.png'
import b1 from '@/assets/img/hamburger/b1.png'
import b2 from '@/assets/img/hamburger/b2.png'
import b3 from '@/assets/img/hamburger/b3.png'
import b4 from '@/assets/img/hamburger/b4.png'
import background from '@/assets/img/hamburger/background.png'

import { useRouter } from 'vue-router'

const router = useRouter()
const eatCoin = ref(256)
const eat2NT = ref(100)
const client_id = ref(1) // Replace with your actual client ID
const buttonImages = [b0, b1, b2, b3, b4] // Array of imported images
const imgSrc = (name) => {
  return name
}

onMounted(() => {
  // Fetch the user's eatCoin and eat2NT from the API
  // For now, we are using hardcoded values
  getUserData()
  eat2NT.value = 100
})
const getUserData = async () => {
  try {
    const response = await axios.get('get-user-coins', {
      params: {
        client_id: client_id.value,
      },
    })
    eatCoin.value = response.data.coin
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

const buttons = ['數位綁定', '載具', '成為吃貨', '登出']

const handleClick = (button) => {
  switch (button) {
    case '數位帳戶綁定':
      router.push('/bindAccount')
      break
    case '設定手機條碼載具':
      router.push('/setBarcode')
      break
    case '積福幣兌換商城':
      router.push('/exchangeShop')
      break
    case '吃貨兌換券倉庫':
      router.push('/couponWarehouse')
      break
    case '吃貨競技場':
      router.push('/eatArena')
      break
    case '吃貨會員介紹':
      router.push('/memberIntroduction')
      break
    case '吃貨等級說明':
      router.push('/levelExplanation')
      break
    case '吃貨線上點餐服務':
      router.push('/onlineOrdering')
      break
    case '會員隱私與權益說明':
      router.push('/privacyPolicy')
      break
    case '登出':
      // Handle logout logic here
      break
  }
}
</script>

<style scoped>
.container {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 101;
  width: 100%;
  height: 100vh;
  right: 0;
  gap: 16px;
}

.coin {
  position: relative;
  margin-bottom: 0;
  bottom: -1.5px;
  margin-top: 0;
  font-size: 24px;
}

.green {
  color: #67c862;
}

.button {
  position: absolute;
  border: none;
  background-color: transparent;
  font-family: 'Kaisei HarunoUmi', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 100%;
}

.button.b0 {
  width: 307px;
  height: 307px;
  top: 381px;
  left: 300px;
}

.button.b1 {
  width: 205px;
  height: 205px;
  top: 100px;
  left: 700px;
}

.button.b2 {
  width: 170px;
  height: 170px;
  top: 421px;
  left: 900px;
}

.button.b3 {
  width: 247px;
  height: 247px;
  top: 134px;
  left: 450px;
}

.button.b4 {
  width: 125px;
  height: 125px;
  top: 185px;
  left: 970px;
}

.background {
  position: absolute;
  width: 319px;
  height: 319px;
  top: 312px;
  left: 620px;
}
</style>
