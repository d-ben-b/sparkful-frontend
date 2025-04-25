import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserProfileStore = defineStore('userProfile', () => {
  // State
  const nutrition_score = ref({
    protein: 30,
    starch: 30,
    cellulose: 40,
  }) // Or initialize with 0 or another default value
  function setNutritionScore(score) {
    nutrition_score.value = score
    console.log('Nutrition score updated in store:', nutrition_score.value)
  }

  function getNutritionScore() {
    console.log('Nutrition score retrieved from store:', nutrition_score.value)
    return nutrition_score.value
  }
  return {
    nutrition_score,
    setNutritionScore,
    getNutritionScore,
  }
})
