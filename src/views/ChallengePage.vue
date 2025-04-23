<template>
  <div class="challenge-selection">
    <div class="slider-container">
      <div class="slider">
        <div
          class="slider-track"
          :style="{ transform: `translateX(-${displayPosition}%)`, transition: transitionStyle }"
        >
          <img
            v-for="(slide, index) in extendedSlides"
            :key="index"
            :src="slide"
            alt="Challenge image"
          />
        </div>
        <div class="slider-controls">
          <button @click="prevSlide" class="slider-btn prev">&lt;</button>
          <button @click="nextSlide" class="slider-btn next">&gt;</button>
        </div>
        <div class="slider-indicators">
          <span
            v-for="(_, index) in slides"
            :key="index"
            :class="{ active: getRealIndex() === index }"
            @click="goToSlide(index)"
          >
          </span>
        </div>
      </div>
    </div>
    <div class="customer-cards">
      <CardComp
        v-for="(challenge, id) in customer_challenges"
        :key="id"
        :challengeType="challenge.challengeType"
        :challengePhoto="challenge.challengePhoto"
        :challengeContext="challenge.challengeContext"
        :challengePerson="challenge.challengePerson"
        :challengeTime="challenge.challengeTime"
        :star="challenge.star"
        :cardType="challenge.cardType"
      />
    </div>
    <svg
      width="1118"
      height="2"
      viewBox="0 0 1118 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style="top: 875px; position: absolute; left: 100px"
    >
      <line x1="-0.000244141" y1="1.00293" x2="1118" y2="1.00293" stroke="black" />
    </svg>

    <div class="shop-cards">
      <CardComp
        v-for="(challenge, id) in shop_challenges"
        :key="id"
        :challengeType="challenge.challengeType"
        :challengePhoto="challenge.challengePhoto"
        :challengeContext="challenge.challengeContext"
        :challengePerson="challenge.challengePerson"
        :challengeTime="challenge.challengeTime"
        :star="challenge.star"
        :cardType="challenge.cardType"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import CardComp from '../components/CardComp.vue'

import challenge1 from '../assets/img/challenge/challenge1.png'
import challenge2 from '../assets/img/challenge/challenge2.png'
import image from '../assets/img/challenge_inner_pic/image.png'

// Original slides
const slides = [
  challenge1,
  challenge2,
  // Add more images if needed
]

// Create extended slides array with clones for infinite effect
const extendedSlides = computed(() => {
  // Add last slide at beginning and first slide at end
  return [slides[slides.length - 1], ...slides, slides[0]]
})

// Current position in extended slides array (add 1 because we have a clone at the beginning)
const currentIndex = ref(1)
const transitionActive = ref(true)

// Computed property for CSS
const displayPosition = computed(() => currentIndex.value * 100)
const transitionStyle = computed(() => (transitionActive.value ? 'transform 0.8s ease' : 'none'))

// Get the index of real slide (for indicators)
const getRealIndex = () => {
  if (currentIndex.value === 0) return slides.length - 1
  if (currentIndex.value === extendedSlides.value.length - 1) return 0
  return currentIndex.value - 1
}

const nextSlide = () => {
  if (!transitionActive.value) transitionActive.value = true
  currentIndex.value++

  // If we've moved to the clone of the first slide
  if (currentIndex.value === extendedSlides.value.length - 1) {
    // After transition completes, jump to the real first slide without animation
    setTimeout(() => {
      transitionActive.value = false
      currentIndex.value = 1
      // Re-enable transitions after the next render cycle
      nextTick(() => {
        setTimeout(() => {
          transitionActive.value = true
        }, 50)
      })
    }, 800)
  }
}

const prevSlide = () => {
  if (!transitionActive.value) transitionActive.value = true
  currentIndex.value--

  // If we've moved to the clone of the last slide
  if (currentIndex.value === 0) {
    // After transition completes, jump to the real last slide without animation
    setTimeout(() => {
      transitionActive.value = false
      currentIndex.value = slides.length
      // Re-enable transitions after the next render cycle
      nextTick(() => {
        setTimeout(() => {
          transitionActive.value = true
        }, 50)
      })
    }, 800)
  }
}

const goToSlide = (index) => {
  // +1 because of the cloned slide at the beginning
  transitionActive.value = true
  currentIndex.value = index + 1
}

let slideInterval

const startSlideshow = () => {
  slideInterval = setInterval(nextSlide, 5000)
}

const stopSlideshow = () => {
  clearInterval(slideInterval)
}

onMounted(() => {
  startSlideshow()
})

onBeforeUnmount(() => {
  stopSlideshow()
})

//TODO: Add a function to get the challenge data from the server
const customer_challenges = ref({
  1: {
    challengeType: 'default',
    challengePhoto: image,
    challengeContext: 'default',
    challengePerson: 'default',
    challengeTime: 'default',
    star: 1,
    cardType: 'challenge',
  },
  2: {
    challengeType: '一日減糖挑戰',
    challengePhoto: image,
    challengeContext: '今天炒飯來吃，我放了菠菜、蝦子，少油少鹽吃起來無負擔',
    challengePerson: '小明',
    challengeTime: '2023-10-01',
    star: 3,
    cardType: 'normal',
  },
  3: {
    challengeType: 'default',
    challengePhoto: image,
    challengeContext: 'default',
    challengePerson: 'default',
    challengeTime: 'default',
    star: 1,
    cardType: 'challenge',
  },
  4: {
    challengeType: 'default',
    challengePhoto: image,
    challengeContext: 'default',
    challengePerson: 'default',
    challengeTime: 'default',
    star: 1,
    cardType: 'challenge',
  },
})
const shop_challenges = ref({
  1: {
    challengeType: 'default',
    challengePhoto: image,
    challengeContext: 'default',
    challengePerson: 'default',
    challengeTime: 'default',
    star: 2,
    cardType: 'challenge',
  },
  2: {
    challengeType: '一日減糖挑戰',
    challengePhoto: image,
    challengeContext: '今天炒飯來吃，我放了菠菜、蝦子，少油少鹽吃起來無負擔',
    challengePerson: '小明',
    challengeTime: '2023-10-01',
    star: 4,
    cardType: 'normal',
  },
  3: {
    challengeType: 'default',
    challengePhoto: image,
    challengeContext: 'default',
    challengePerson: 'default',
    challengeTime: 'default',
    star: 1,
    cardType: 'challenge',
  },
  4: {
    challengeType: 'default',
    challengePhoto: image,
    challengeContext: 'default',
    challengePerson: 'default',
    challengeTime: 'default',
    star: 1,
    cardType: 'challenge',
  },
})
</script>

<style scoped>
h1 {
  font-size: 24px;
}

.challenge-selection {
  position: absolute;
  width: 100%;
  overflow: hidden;
}

.slider-container {
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
}

.slider {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.slider-track {
  display: flex;
  width: 100%;
  height: 100%;
  /* transition is now controlled via inline style */
}

.slider-track img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
}

.slider-controls {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 2;
}

.slider-btn {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

.slider-indicators {
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  z-index: 2;
}

.slider-indicators span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.slider-indicators span.active {
  background: white;
}

.shop-cards,
.customer-cards {
  position: relative;
  display: flex;
  gap: 20px;
  width: 1200px;
  height: 465px;
  border-radius: 100px;
  border-width: 5px;
  justify-self: center;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 20px;
}

.find-more {
  display: flex;
  position: absolute;
  width: 241px;
  height: 93px;
  top: 75px;
  left: 87px;
  border-radius: 300px;
  border-width: 1px;
  background: #fffdfd;
  border: 1px solid #000000;
  font-weight: 600;
  font-size: 30px;
  line-height: 120%;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.find-more:hover {
  background: #faac59;
  color: #ffffff;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}
</style>
