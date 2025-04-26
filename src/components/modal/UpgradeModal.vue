<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="main-contain">
        <svg width="1074" height="558" viewBox="0 0 1074 558" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="326.5" y="39.5" width="740" height="335" rx="42.5" fill="white" stroke="#D4FF93" stroke-width="15" />
          <circle cx="343.5" cy="206.5" r="165.5" fill="white" stroke="#D4FF93" stroke-width="20" />
        </svg>
        <div class="desc">
          <div class="level-container">
            <div class="level">Level {{ level }}</div>
            <img :src="levelImageSrc" alt="" class="food-image" />
            <div class="food-name">{{ levelDescList[level] }}</div>
          </div>
          <div class="description">
            <p>大醬鍋象徵著內斂卻深厚的風味與智慧</p>
            <p>成為大醬鍋等級的吃貨</p>
            <p>不只是遊戲裡的榮耀</p>
            <p>更是一種生活態度的展現：</p>
            <p>懂吃、會省、最強。</p>
            <div class="stars">
              <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
            </div>
          </div>
        </div>

      </div>


    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'


const props = defineProps({
  level: {
    type: Number,
    default: 0,
  },
})

const level = ref(props.level)

const levelDescList = ref(['銅鍋', '銀鍋', '韓式黃銅鍋', '韓式陶鍋', '平底鍋', '炒鍋', '日式土鍋', '韓式銅盤', '微波爐', '大同電鍋', '壓力鍋', '氣炸鍋',
  '部隊鍋', '壽喜燒', '關東煮', '韓式拉麵', '海帶湯', '豬肉湯飯', '大醬鍋', '韓式銅盤烤肉', '海南雞飯', '炒飯', '烤鮭魚'
])

const levelImageSrc = computed(() => {
  if (level.value >= 0) {
    // Paths relative to the public folder are accessed from the root
    return `/img/levels/image${level.value}.png`
  }
  return null // Or a default path like '/img/levels/default.png'
})
</script>

<style scoped>
.modal-overlay {
  /* Basic overlay styling */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  /* Ensure it's on top */
}

.modal-content {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 558px;
}

.desc {
  display: flex;
  align-items: center;
}

.main-contain {
  display: flex;
  width: 100%;
  height: 558px;
  justify-content: center;
}

.main-contain svg {
  position: absolute;
  top: 10vh;
  z-index: -1;
  /* Responsive SVG */
}

.food-name {
  font-weight: bold;
  color: #333;
  font-family: Kaisei Decol;
  font-weight: 500;
  font-size: 30px;
  line-height: 100%;
  text-align: center;
}

.level {
  color: #333;
  font-family: Kaisei Decol;
  font-weight: 500;
  font-size: 25px;
  line-height: 100%;
  text-align: center;
}

.stars {
  top: 197px;
  left: 242px;
  font-size: 0.9em;
  /* Make stars larger */
  margin-bottom: 15px;
  color: #fdd835;
  /* Yellow star color */
}

.stars span {
  margin-right: 5px;
  /* Space between stars */
}

.description {
  width: 100%;
  font-family: Kaisei Decol;
  font-weight: 500;
  font-size: 27px;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: center;
}

.description p {
  margin: 5px 0;
  /* Adjust spacing between paragraphs */
}

.food-image {
  width: 170px;
  height: 170px;
  top: 302px;
  left: 295px;
}

.level-container {
  display: flex;
  flex-direction: column;
  top: 179px;
  left: -24px;
  justify-content: center;
  align-items: center;
  margin-right: 100px;
  margin-left: 150px;
}
</style>
