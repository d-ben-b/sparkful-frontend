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

  const user_level = ref(0) // Or initialize with 0 or another default value

  function setNutritionScore(score) {
    nutrition_score.value = score
    console.log('Nutrition score updated in store:', nutrition_score.value)
  }

  function setEatCoin(score) {
    eat_coin.value = score
    console.log('Eat coin updated in store:', eat_coin.value)
  }

  function addUserLevel(level) {
    user_level.value += level
    console.log('User level updated in store:', user_level.value)
  }

  function setUserLevel(level) {
    user_level.value = level
    console.log('User level updated in store:', user_level.value)
  }

  function getEatCoin() {
    console.log('Eat coin retrieved from store:', eat_coin.value)
    return eat_coin.value
  }

  function getNutritionScore() {
    console.log('Nutrition score retrieved from store:', nutrition_score.value)
    return nutrition_score.value
  }

  function getUserLevel() {
    console.log('User level retrieved from store:', user_level.value)
    return user_level.value
  }

  return {
    setEatCoin,
    getEatCoin,
    nutrition_score,
    setNutritionScore,
    getNutritionScore,
    addUserLevel,
    getUserLevel,
    setUserLevel,
  }
})
