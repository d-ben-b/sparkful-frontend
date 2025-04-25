<template>
  <div class="container">
    <div class="profile-pic">
      <img :src="photo" alt="" />
      <div class="challenge-bar">
        <p class="name">{{ profile.name }}</p>
        <p class="coin">積福幣 : {{ profile.eatCoin }}</p>
        <h5 class="title">
          {{ challengeBar.title }}
          <div class="title-progress">{{ i }}%</div>
        </h5>
        <div id="myProgress">
          <div id="myBar"></div>
        </div>

        <p class="desc">{{ challengeBar.desc }}</p>
      </div>
      <div class="profile-desc">
        <p>{{ profile.self_intro }}</p>
      </div>
      <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.732 5.1841H5.05155C4.24223 5.1841 3.46605 5.50038 2.89378 6.06337C2.3215 6.62635 2 7.38992 2 8.1861V29.2001C2 29.9963 2.3215 30.7599 2.89378 31.3228C3.46605 31.8858 4.24223 32.2021 5.05155 32.2021H26.4124C27.2217 32.2021 27.9979 31.8858 28.5701 31.3228C29.1424 30.7599 29.4639 29.9963 29.4639 29.2001V18.6931M27.1753 2.9326C27.7822 2.33547 28.6055 2 29.4639 2C30.3223 2 31.1456 2.33547 31.7526 2.9326C32.3596 3.52974 32.7006 4.33963 32.7006 5.1841C32.7006 6.02858 32.3596 6.83847 31.7526 7.4356L17.2577 21.6951L11.1546 23.1961L12.6804 17.1921L27.1753 2.9326Z"
          stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>

    <div class="analysis">
      <PieChartComp :charData="pieChartData" />
      <div class="cal">
        <button class="calender-switch" @click="showComp(1)">帳鋪</button>
        <button class="calender-switch1" @click="showComp(0)">行事曆</button>
        <CalendarComp :userData="userData" @toggle-emit="selectionDate" v-if="show_comp === 0" />
        <bookkeepingComp v-else />
      </div>
    </div>
    <div class="user-past-post">
      <div class="post" v-for="(post, index) in userPosts.posts" :key="index">
        <img :src="post.imageUrl || ''" alt="Post image">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'
import CalendarComp from '@/components/CalendarComp.vue'
import PieChartComp from '@/components/PieChartComp.vue'
import bookkeepingComp from '@/components/bookkeepingComp.vue'
import { useUserProfileStore } from '@/stores/userProfile'

import photo from '@/assets/img/profile/photo.png'

const store = useUserProfileStore()

const pieChartData = ref()

const client_id = ref(1)

const show_comp = ref(0)
const showComp = (comp_num) => {
  show_comp.value = comp_num
}
//TODO get from backend
const progress = ref(98)
const i = ref(0)
const challengeBar = ref({
  title: '一周不吃油炸挑戰',
  desc: '革命尚未成功  同志尚須努力',
})
const profile = ref({
  name: 'DEBBY',
  eatCoin: 256,
  eat2NT: 100,
  tile: '銅鍋',
  self_intro: `
我是個熱愛美食的精打細算吃貨

相信吃得好也能存得住！

夢想是開一間CP值超高的小餐館

讓大家都能享受平價又健康的美味`,
})

const userPosts = ref({ posts: [] })

const userData = ref([
  {
    event: {
      date: '2025-04-01',
      event: '吃了炸雞',
    },
    event2: {
      date: '2025-04-02',
      event: '吃了沙拉',
    },
    event3: {
      date: '2025-04-03',
      event: '吃了蛋糕',
    },
    event4: {
      date: '2025-04-10',
      event: '吃了便當',
    },
  },
])

const selectionDate = (Date) => {
  alert(Date)
}

const getUserData = async () => {
  const response = await axios.get('get-user-coins', {
    params: {
      client_id: client_id.value,
    },
  })
  store.setEatCoin(response.data.coin)
  profile.value.eatCoin = response.data.coin
}

const getUserPost = async () => {
  const response = await axios.get('see-post', {
    params: {
      client_id: client_id.value,
    },
  })

  // Create a copy of the response data
  const postsData = { ...response.data }

  // Add image URLs to each post
  if (postsData.posts && Array.isArray(postsData.posts)) {
    for (const post of postsData.posts) {
      try {
        // Load the image for each post
        post.imageUrl = await getImg(post.img)
      } catch (error) {
        console.error("Failed to load image:", error)
        post.imageUrl = '' // Set a default or empty string on error
      }
    }
  }

  userPosts.value = postsData
}

const getImg = async (post) => {
  try {
    console.log(`media${post}`)
    // Set responseType to 'blob' to handle binary data
    const response = await axios.get(`media${post}`, {
      responseType: 'blob'
    })

    // Create a URL for the blob data
    const blob = new Blob([response.data], { type: response.headers['content-type'] })
    return URL.createObjectURL(blob)
  } catch (error) {
    console.error("Error fetching image:", error)
    return '' // Return empty string or a placeholder image URL
  }
}

const move = () => {
  const elem = document.getElementById('myBar')
  let id = setInterval(frame, 10)
  let width = 0

  function frame() {
    if (width >= progress.value) {
      clearInterval(id)
    } else {
      width++
      elem.style.width = width + '%'
      i.value = width
    }
  }
}

watch()(
  () => i.value,
  (newValue) => {
    const elem = document.getElementById('myBar')
    let id = setInterval(frame, 10)
    let width = 0

    function frame() {
      if (width >= newValue) {
        clearInterval(id)
      } else {
        width++
        elem.style.width = width + '%'
        i.value = width
      }
    }
  },
)

watch()(
  () => store.getNutritionScore(),
  (newValue) => {
    pieChartData.value = newValue
  },
)


onMounted(() => {
  move()
  getUserData()
  getUserPost()
})
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  font-family: 'Kaisei HarunoUmi', sans-serif;
}

.profile-pic {
  display: flex;
  width: 100%;
  height: 228px;
  top: 80px;
  background: #91ad6fb2;
  justify-content: space-between;
}

.profile-pic img {
  width: 165px;
  height: 190px;
  margin-top: 18px;
  margin-left: 84px;
}

.profile-pic .challenge-bar {
  top: 98px;
  margin-left: 75px;
  height: 107px;
}

#myProgress {
  width: 448px;
  background: #e6e6e6;
  border-radius: 20px;
  position: relative;
}

#myBar {
  width: 1%;
  height: 10px;
  background-color: rgb(0, 0, 0);
  border-radius: 20px;
}

.challenge-bar .name {
  font-weight: 500;
  font-size: 30px;
  line-height: 100%;
  text-align: left;
  margin-top: 26px;
  margin-bottom: 13px;
}

.title {
  display: flex;
  justify-content: space-between;
  font-weight: 400;
  font-size: 30px;
  line-height: 140%;
  margin: 0;
}

.title-progress {
  margin-top: 8px;
  font-size: 16px;
  text-align: center;
}

.profile-desc {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 364px;
  height: 212px;
  margin-top: 7px;
  margin-left: 84px;
  border-radius: 20px;
  background: #d3e9b8b2;
}

.profile-desc p {
  position: relative;
  justify-self: start;
  font-weight: 500;
  font-size: 19px;
  line-height: 40px;
  letter-spacing: 0.1px;
  vertical-align: middle;
  width: 287px;
  height: 174px;
}

.basic-intro {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
}

.challenge-bar .coin {
  font-weight: 100;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0%;

  margin: 0;
}

.basic-intro button {
  height: 47px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 16px;
  padding-top: 16px;
  padding-right: 20px;
  padding-bottom: 16px;
  padding-left: 16px;
  font-weight: 500;
  font-size: 20px;
  text-align: center;
  vertical-align: middle;
  background: var(--Schemes-Surface-Container-High, #ece6f0);
  box-shadow: 0px 1px 3px 0px #0000004d;
  box-shadow: 0px 4px 8px 3px #00000026;
  border: none;
  color: var(--Schemes-Primary, #65558f);
  cursor: pointer;
}

.basic-intro .hamburger {
  margin-top: 5px;
}

.basic-intro .hamburger span {
  display: block;
  width: 24px;
  height: 1.8px;
  background: var(--Schemes-Primary, #65558f);
  margin-bottom: 3px;
}

.basic-intro svg {
  cursor: pointer;
}

.detail {
  display: flex;
  padding: 0px 32px;
}

.detail .tile {
  width: 282px;
  height: 455px;
  border-radius: 200px;
  background: #eee3c7;
}

.detail .intro {
  width: 370px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  word-wrap: break-word;
  padding: 0px 32px;
}

.analysis {
  display: flex;
  width: 100%;
  height: 417px;
  top: 513px;
  background: #90c5ce80;
}

.calender-switch {
  cursor: pointer;
  position: relative;
  top: 50px;
  left: 250px;
  z-index: 10;
  border-radius: 8px;
  gap: 8px;
  padding: 12px;
  width: 60px;
  margin-right: 16px;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
}

.calender-switch1 {
  cursor: pointer;
  position: relative;
  top: 50px;
  left: 250px;
  z-index: 10;
  border-radius: 8px;
  gap: 8px;
  padding: 12px 8px;
  width: 68px;
  margin-right: 16px;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
}

.user-past-post {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  top: 513px;
  background: #90c5ce80;
  padding-left: 108px;
  justify-content: center
}

.post {
  width: 201px;
  height: 237px;
  border-width: 1px;
  margin-right: 74px;
}

.post img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}
</style>
