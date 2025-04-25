<template>
  <div class="upload-page">
    <div class="dialog_box" v-if="!uploaded">
      <div class="upload-area">
        <div class="icon-placeholder"></div>
        <label for="file-upload" class="upload-button">從電腦上傳</label>
        <input id="file-upload" type="file" @change="handleFileUpload" />
      </div>
      <img src="@\assets\img\profile\image.png" alt="" style="width: 75px" />
      <p>積幅幣換算</p>
    </div>

    <div class="food-rating-form" v-else>
      <div class="form-container">
        <div class="food-image-section">
          <img :src="previewImageUrl" alt="Food Image" class="food-image" />
          <div class="star-rating">
            <span v-for="i in 3" :key="i" class="star" :class="{ filled: i <= rating }">★</span>
          </div>
          <div class="coin-display">
            <!-- <img src="@/assets/img/profile/coin.png" alt="Coin" class="coin-icon" /> -->
            <span class="coin-text">💰積福點：+{{ coin }}</span>
          </div>
        </div>

        <div class="rating-details">
          <div class="form-group">
            <div class="form-label">吃貨宣告：</div>
            <div class="form-input">
              <input type="text" v-model="title" class="example-text" placeholder="ex:一日不吃炸豬腳" required />
            </div>
          </div>

          <div class="form-group">
            <div class="form-label">參與挑戰：</div>
            <div class="form-input">
              <div class="radio-buttons">
                <label class="radio-label">
                  <input type="radio" name="challenge" v-model="hasChallenge" :value="true" />
                  有
                </label>
                <label class="radio-label">
                  <input type="radio" name="challenge" v-model="hasChallenge" :value="false" />
                  沒有
                </label>
              </div>
              <div class="dropdown-container" v-if="hasChallenge" @click="toggleDropdown">
                <div class="dropdown-button">
                  <span>{{ selectedChallenge || '(選擇下拉式選單)' }}</span>
                  <span class="dropdown-icon">➡</span>
                </div>
                <ul v-if="isDropdownOpen" class="dropdown-list">
                  <li v-for="challenge in challengeOptions" :key="challenge.id" @click.stop="selectChallenge(challenge)"
                    class="dropdown-item">
                    {{ challenge.desc }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="form-label">吃貨花費：</div>
            <div class="form-input cost-input">
              <input type="number" v-model="cost" class="cost-field" min="1" required />
              <span class="currency-symbol">$</span>
              <label class="radio-label">
                <input type="radio" name="costSharing" v-model="isShared" :value="true" />
                分享
              </label>
              <label class="radio-label">
                <input type="radio" name="costSharing" v-model="isShared" :value="false" />
                不分享
              </label>
            </div>
          </div>

          <div class="form-group">
            <div class="form-label">吃貨備錄：</div>
            <div class="form-input">
              <textarea v-model="notes" class="notes-field" placeholder="ex：
  今天的飯來吃
  我做了蕃茄、蛋子
  少油少鹽吃起來無負擔"></textarea>
            </div>
          </div>

          <button class="submit-button" @click="submitRating">吃貨徵集</button>
        </div>
      </div>
    </div>

    <div class="coin-conversion" v-if="!show_dialog && !uploaded">
      <p class="bottom-text" @click="handleCoinConversion">積幅幣換算</p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useUserProfileStore } from '@/stores/userProfile' // Import the store

const uploadStore = useUserProfileStore() // Instantiate the store

const coin = ref(0) // Default to 30 as shown in the image
const client_id = ref(1)
const img_id = ref(0)
const show_dialog = ref(true)
const uploaded = ref(false)
const previewImageUrl = ref('')
const rating = ref(3) // Default rating (3 stars)
const hasChallenge = ref(true) // Default to "有"
const selectedChallenge = ref('')
const challengeOptions = ref([])
const isDropdownOpen = ref(false)
const cost = ref('')
const isShared = ref(false) // Default to "不分享"
const notes = ref('')
const title = ref('') // Title for the challenge
const number_of_posts = ref(0) // Number of posts

const emit = defineEmits(['toggle-close', 'toggle-upgrade', 'toggle-set-nutrition-score', 'reload-page'])

onMounted(() => {
  getChallengeOptions()
})

const getChallengeOptions = async () => {
  try {
    // Fetch challenge options from the server
    const response = await axios.get('challenges')
    if (response.status === 200) {
      console.log('Fetched challenges:', response.data)
      challengeOptions.value = response.data.challenge || []
      return
    }
  } catch (error) {
    console.error('Failed to fetch challenges:', error)
  }

  // Fallback to hardcoded options if API fails
  console.log('Using default challenge options')
  challengeOptions.value = [
    { id: 1, desc: '一日不吃炸豬腳' },
    { id: 2, desc: '一周不吃甜食' },
    { id: 3, desc: '一個月不喝飲料' },
    { id: 4, desc: '健康蔬食週' },
  ]
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectChallenge = (challenge) => {
  selectedChallenge.value = challenge.desc
  isDropdownOpen.value = false // Close dropdown after selection
}

const handleCoinConversion = () => {
  console.log('Coin conversion clicked')
  show_dialog.value = !show_dialog.value // Toggle dialog visibility
}

const getUploadDetail = async () => {
  try {
    const response = await axios.get('stars', {
      params: {
        client_id: client_id.value,
        image_id: img_id.value,
      },
    })
    if (response.status === 200) {
      console.log('Upload details:', response.data)
      rating.value = response.data.stars
      coin.value = rating.value * 10
      return response.data
    }
  } catch (error) {
    console.error('Failed to fetch upload details:', error)
  }
}

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (file) {
    console.log('File selected:', file.name)
    // Create a preview URL for the uploaded image
    previewImageUrl.value = URL.createObjectURL(file)

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await axios.post('upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log('Upload successful:', response.data)

      coin.value = Math.ceil(response.data.ai_results.detections.health_score / 5)
      img_id.value = response.data.database_id
      uploaded.value = true // Show the rating form after successful upload

      // Get nutrition score from response
      const score = response.data.ai_results.detections[0].nutrition_score
      // Update the store state using the action
      uploadStore.setNutritionScore(score)
      getUploadDetail()
    } catch (error) {
      console.error('Upload failed:', error)

      if (error.response.data.msg === 'No valid food items detected in the image') {
        alert('圖片中沒有食物，請重新上傳')
        return
      }
      uploaded.value = false
    }
  }
}

const submitRating = async () => {
  // Implement submission logic here
  const formData = {
    coin: coin.value,
    title: title.value,
    cost: cost.value,
    share_able: isShared.value,
    desc: notes.value,
    challenge: hasChallenge.value ? selectedChallenge.value : null,
    client_id: client_id.value,
  }
  try {
    const response = await axios.post('upload-post', formData)
    if (response.status === 200) {
      console.log('Rating submitted successfully:', response.data)
      alert('評價已提交！')
      uploaded.value = false
      number_of_posts.value = response.data.client_posts
      if (number_of_posts.value % 2 === 0) {
        console.log('Even number of posts, showing upgrade dialog')
        emit('toggle-upgrade')
      }
      emit('toggle-close') // Close the dialog after submission
    }
  } catch (error) {
    console.error('Failed to submit rating:', error)
    alert('評價提交失敗，請稍後再試。')
    uploaded.value = true // Keep the form open for retry
  }
  previewImageUrl.value = ''
}
</script>

<style scoped>
/* Existing dialog box styles */

.upload-page {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.dialog_box {
  z-index: 102;
  position: absolute;
  width: 525px;
  height: 574px;
  padding: 40px;
  background: #e0f1cc;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.upload-area {
  width: 320px;
  height: 320px;
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 30px;
}

.icon-placeholder {
  width: 120px;
  height: 100px;
  background-image: url('data:image/svg+xml;...');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.upload-button {
  background-color: #4285f4;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  z-index: 2;
  position: relative;
}

.upload-button:hover {
  background-color: #357ae8;
}

#file-upload {
  display: none;
}

.bottom-icon {
  cursor: pointer;
  width: 64px;
  height: auto;
  margin-bottom: 10px;
}

.bottom-text {
  font-size: 16px;
  color: #333;
  margin: 0;
  font-weight: bold;
}

/* New styles for food rating form */
.food-rating-form {
  z-index: 102;
  position: absolute;
  width: 1152px;
  height: auto;
  padding: 40px;
  background: #e0f1cc;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.form-container {
  display: flex;
  width: 100%;
}

.food-image-section {
  justify-content: center;
  width: 205px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
}

.food-image {
  width: 260px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 15px;
}

.star-rating {
  margin-bottom: 15px;
}

.star {
  font-size: 24px;
  color: #ddd;
  cursor: pointer;
}

.star.filled {
  color: #ffd700;
}

.coin-display {
  display: flex;
  align-items: center;
}

.coin-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.coin-text {
  font-weight: bold;
  font-size: 18px;
}

.rating-details {
  flex: 1;
}

.form-group {
  align-items: center;
  margin-bottom: 20px;
  display: flex;
}

.form-label {
  width: 100px;
  font-weight: bold;
  padding-top: 3px;
}

.form-input {
  flex: 1;
}

.example-text {
  width: 451px;
  height: 20px;
  border-radius: 4px;
  padding-top: 12px;
  padding-right: 16px;
  padding-bottom: 12px;
  padding-left: 16px;
  gap: 8px;
  color: #777;
  font-size: 14px;
}

.radio-buttons {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.dropdown-container {
  position: relative;
  border: 1px solid #ccc;
  padding: 5px 15px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  background-color: #fff;
  cursor: pointer;
  margin-top: 8px;
}

.dropdown-button {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.dropdown-icon {
  transform: rotate(90deg);
  transition: transform 0.3s;
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 5px;
  padding: 0;
  list-style: none;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  padding: 8px 15px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.cost-input {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cost-field {
  width: 100px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.currency-symbol {
  margin-right: 20px;
}

.notes-field {
  width: 100%;
  height: 120px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  resize: none;
}

.submit-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  float: right;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>
