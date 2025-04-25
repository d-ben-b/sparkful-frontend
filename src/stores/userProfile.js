import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserProfileStore = defineStore('userProfile', () => {
  // State
  const nutrition_score = ref({
    protein: 30,
    starch: 30,
    cellulose: 40,
  }) // Or initialize with 0 or another default value

  const eat_coin = ref(256) // Or initialize with 0 or another default value

  function setNutritionScore(score) {
    nutrition_score.value = score
    console.log('Nutrition score updated in store:', nutrition_score.value)
  }

  function setEatCoin(score) {
    eat_coin.value = score
    console.log('Eat coin updated in store:', eat_coin.value)
  }

  function getEatCoin() {
    console.log('Eat coin retrieved from store:', eat_coin.value)
    return eat_coin.value
  }

  function getNutritionScore() {
    console.log('Nutrition score retrieved from store:', nutrition_score.value)
    return nutrition_score.value
  }
  return {
    setEatCoin,
    getEatCoin,
    nutrition_score,
    setNutritionScore,
    getNutritionScore,
  }
})
