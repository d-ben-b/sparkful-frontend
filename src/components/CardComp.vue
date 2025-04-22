<template>
  <div class="card" :style="backgroundStyle">
    <h3>{{ title }}</h3>
    <p>{{ content }}</p>
    <p v-if="challengeType" class="title">{{ challengeType }}</p>
    <img :src="challengePhoto" alt="Challenge Image" />
    <p v-if="challengeContext" class="contest">{{ challengeContext }}</p>
    <div class="stars">
      <!-- 迴圈 1~5 -->
      <span v-for="i in 5" :key="i" class="star">
        <i v-if="i <= star" class="fa fa-star" style="font-size: 15px"></i>
        <i v-else class="fa fa-star-o" style="font-size: 15px"></i>
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  cardType: {
    type: String,
    default: 'default',
  },
  title: String,
  content: String,
  challengePhoto: String,
  challengeType: String,
  challengeContext: String,
  challengePerson: String,
  challengeTime: String,
  star: [String, Number], // Adjust type as needed
})

const backgroundStyle = computed(() => {
  return {
    background: `${props.cardType === 'challenge' ? '#FE7E818F' : 'transparent'}`,
  }
})

</script>

<style scoped>
.card {
  position: relative;
  display: flex;
  border: 5px solid #000000;
  padding: 1rem;
  border-radius: 40px;
  width: 226px;
  height: 372px;
  word-wrap: break-word;
  justify-content: center;
  margin-left: 30px;
  margin-bottom: 20px;
}

.title {
  display: flex;
  position: absolute;
  width: 195px;
  height: 24px;
  top: 17.21px;
  border-radius: 20px;
  border-width: 1px;
  background: #faac59;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  border: 1px solid #000000;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 120%;
  text-align: center;
  margin: 0 auto;
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
}

img {
  position: absolute;
  width: 176px;
  height: 176px;
  top: 62.37px;
  border-width: 1px;
}

.contest {
  position: absolute;
  width: 115px;
  height: 74px;
  top: 273.1px;
  left: 93.14px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 17px;
  line-height: 150%;
  letter-spacing: -2%;
  text-align: center;
  color: #786a6a;
  margin: 0 auto;
}

.stars {
  position: absolute;
  width: 181px;
  height: 24px;
  top: 235px;
  left: 128px;
}
</style>
