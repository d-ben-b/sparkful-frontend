<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <svg width="1074" height="558" viewBox="0 0 1074 558" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="326.5" y="39.5" width="740" height="335" rx="42.5" fill="white" stroke="#D4FF93" stroke-width="15" />
        <circle cx="343.5" cy="206.5" r="165.5" fill="white" stroke="#D4FF93" stroke-width="20" />
        <div class="level">Level 19.</div>
        <!-- <img src="@/assets/images/doenjang_jjigae.png" alt="大醬鍋" class="food-image"> Placeholder image path -->
        <div class="food-name">大醬鍋</div>
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
      </svg>



    </div>
  </div>
</template>

<script setup>
// No script logic needed for this static example yet
// Props or reactive data could be added here later
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
  max-width: 700px;
}

.modal-content svg {
  position: absolute;
  top: 100px;
  left: 200px;
  z-index: -1;
  /* Responsive SVG */
}

.food-name {
  position: absolute;
  font-weight: bold;
  color: #333;
  font-family: Kaisei Decol;
  font-weight: 500;
  font-size: 30px;
  line-height: 100%;
  text-align: center;
  top: 393px;
  left: 501px;
}

.level {
  position: absolute;
  top: 195px;
  left: 495px;
  margin-bottom: 10px;
  color: #333;
  font-family: Kaisei Decol;
  font-weight: 500;
  font-size: 25px;
  line-height: 100%;
  text-align: center;
}

.stars {
  position: absolute;
  top: 219px;
  left: 114px;
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
  position: absolute;
  top: 194px;
  left: 750px;
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
  position: absolute;
  width: 100px;
  /* Adjust size as needed */
  height: 100px;
  object-fit: contain;
  /* Ensure image fits well */
  margin-bottom: 10px;
}
</style>
