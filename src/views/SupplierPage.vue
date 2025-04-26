<template>
  <div class="container">
    <div class="upper">
      <img :src="VIPshop" alt="" class="VIPshop" />
      <div v-for="(text, index) in buttons" :key="index" class="border" :class="`box-${index + 1}`">
        <img :src="VIPbutton" alt="" />
        <button class="selection" @click="useGoto('customer-page')">{{ text }}</button>
      </div>
    </div>
    <div class="forms-container">
      <div class="column left-column">
        <!-- Brand Cooperation Form -->
        <div class="form-section brand-coop">
          <h3>品牌合作 <button class="submit-button">一鍵送審</button></h3>
          <div class="form-group">
            <label>起始日期:</label>
            <input type="text" placeholder="年" /> 年
            <input type="text" placeholder="月" /> 月
            <input type="text" placeholder="日" /> 日
          </div>
          <div class="form-group">
            <label>終止日期:</label>
            <input type="text" placeholder="年" /> 年
            <input type="text" placeholder="月" /> 月
            <input type="text" placeholder="日" /> 日
          </div>
          <div class="form-group">
            <label>公司名稱:</label>
            <input type="text" />
          </div>
          <div class="form-group">
            <label>品牌理念:</label>
            <textarea></textarea>
          </div>
        </div>

        <!-- Advertisement Placement Form -->
        <div class="form-section ad-placement">
          <h3>廣告投放 <button class="submit-button">一鍵送審</button></h3>
          <div class="form-group">
            <label>起始日期:</label>
            <input type="text" placeholder="年" /> 年
            <input type="text" placeholder="月" /> 月
            <input type="text" placeholder="日" /> 日
          </div>
          <div class="form-group">
            <label>終止日期:</label>
            <input type="text" placeholder="年" /> 年
            <input type="text" placeholder="月" /> 月
            <input type="text" placeholder="日" /> 日
          </div>
          <div class="form-group">
            <label>廣告照片:</label>
            <button class="file-button">選擇檔案</button>
          </div>
          <div class="form-group">
            <label>廣告文案:</label>
            <textarea></textarea>
          </div>
        </div>

        <!-- Offer Setting Form -->
        <div class="form-section offer-setting">
          <h3>優惠設定 <button class="submit-button">一鍵送審</button></h3>
          <div class="form-group">
            <label>起始日期:</label>
            <input type="text" placeholder="年" /> 年
            <input type="text" placeholder="月" /> 月
            <input type="text" placeholder="日" /> 日
          </div>
          <div class="form-group">
            <label>終止日期:</label>
            <input type="text" placeholder="年" /> 年
            <input type="text" placeholder="月" /> 月
            <input type="text" placeholder="日" /> 日
          </div>
          <div class="form-group">
            <label>優惠照片:</label>
            <button class="file-button">選擇檔案</button>
          </div>
          <div class="form-group">
            <label>優惠文案:</label>
            <textarea></textarea>
          </div>
        </div>
      </div>

      <div class="column right-column">
        <!-- Financial Institution Cooperation Form -->
        <div class="form-section financial-coop">
          <h3>金融業者合作 <button class="submit-button">一鍵送審</button></h3>
          <div class="form-group">
            <label>起始日期:</label>
            <input type="text" placeholder="年" /> 年
            <input type="text" placeholder="月" /> 月
            <input type="text" placeholder="日" /> 日
          </div>
          <div class="form-group">
            <label>終止日期:</label>
            <input type="text" placeholder="年" /> 年
            <input type="text" placeholder="月" /> 月
            <input type="text" placeholder="日" /> 日
          </div>
          <div class="form-group">
            <label>公司名稱:</label>
            <input type="text" />
          </div>
          <div class="form-group">
            <label>公司規模:</label>
            <input type="radio" name="f_scale" value="上市" id="f_listed" /><label for="f_listed">上市</label>
            <input type="radio" name="f_scale" value="上櫃" id="f_otc" /><label for="f_otc">上櫃</label>
            <label>市值規模:</label> <input type="text" />
          </div>
          <div class="form-group">
            <label>客戶數量:</label>
            <input type="radio" name="f_clients" value="億" id="f_100m" /><label for="f_100m">億</label>
            <input type="radio" name="f_clients" value="萬" id="f_10k" /><label for="f_10k">萬</label>
            <input type="radio" name="f_clients" value="千" id="f_1k" /><label for="f_1k">千</label>
          </div>
          <div class="form-group">
            <label>送審檔案:</label>
            <button class="file-button">選擇檔案</button>
          </div>
          <div class="form-group">
            <label>公司照片:</label>
            <button class="file-button">選擇檔案</button>
          </div>
        </div>

        <!-- Insurance Agency Cooperation Form -->
        <div class="form-section insurance-coop">
          <h3>保險機關合作 <button class="submit-button">一鍵送審</button></h3>
          <div class="form-group">
            <label>起始日期:</label>
            <input type="text" placeholder="年" /> 年
            <input type="text" placeholder="月" /> 月
            <input type="text" placeholder="日" /> 日
          </div>
          <div class="form-group">
            <label>終止日期:</label>
            <input type="text" placeholder="年" /> 年
            <input type="text" placeholder="月" /> 月
            <input type="text" placeholder="日" /> 日
          </div>
          <div class="form-group">
            <label>公司名稱:</label>
            <input type="text" />
          </div>
          <div class="form-group">
            <label>公司規模:</label>
            <input type="radio" name="i_scale" value="上市" id="i_listed" /><label for="i_listed">上市</label>
            <input type="radio" name="i_scale" value="上櫃" id="i_otc" /><label for="i_otc">上櫃</label>
            <label>市值規模:</label> <input type="text" />
          </div>
          <div class="form-group">
            <label>客戶數量:</label>
            <input type="radio" name="i_clients" value="億" id="i_100m" /><label for="i_100m">億</label>
            <input type="radio" name="i_clients" value="萬" id="i_10k" /><label for="i_10k">萬</label>
            <input type="radio" name="i_clients" value="千" id="i_1k" /><label for="i_1k">千</label>
          </div>
          <div class="form-group">
            <label>送審檔案:</label>
            <button class="file-button">選擇檔案</button>
          </div>
          <div class="form-group">
            <label>公司照片:</label>
            <button class="file-button">選擇檔案</button>
          </div>
        </div>

        <!-- Nutritionist Cooperation Form -->
        <div class="form-section nutritionist-coop">
          <h3>營養師合作 <button class="submit-button">一鍵送審</button></h3>
          <div class="form-group">
            <label>專業證照:</label>
            <button class="file-button">選擇檔案</button>
          </div>
          <div class="form-group">
            <label>姓名:</label>
            <input type="text" />
            <label>性別:</label>
            <input type="radio" name="gender" value="男" id="male" /><label for="male">男</label>
            <input type="radio" name="gender" value="女" id="female" /><label for="female">女</label>
          </div>
          <div class="form-group">
            <label>身分證:</label>
            <button class="file-button">正面照上傳</button>
            <button class="file-button">反面照上傳</button>
          </div>
          <div class="form-group">
            <label>自我介紹:</label>
            <textarea></textarea>
          </div>
          <div class="form-group">
            <label>大頭照上傳:</label>
            <button class="file-button">選擇檔案</button>
          </div>
          <div class="form-group">
            <label>送審檔案:</label>
            <button class="file-button">選擇檔案</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VIPshop from '@/assets/img/VIP/VIPshop.png'
import VIPbutton from '@/assets/img/VIP/VIPbutton.png'

const buttons = ref(
  ['品牌合作', '廣告投放', '優惠設定', '金融機關合作', '保險機關合作', '營養師合作'],
)
</script>


<style scoped>
.upper {
  display: grid;
  width: 100%;
  height: 284px;
  grid-template-columns: repeat(6, 3fr);
  grid-template-rows: repeat(3, 33%);
  align-items: center;
  background: #91ad6f;
  justify-items: start;
}

.apply-chart {
  position: absolute;
  top: 0;
  width: 100%;
  box-sizing: border-box;
}

.analyze-button {
  position: absolute;
  z-index: 2;
  cursor: pointer;
  margin-left: 500px;
  margin-top: 5px;
  width: 83px;
  height: 40px;
  border-radius: 100px;
  background: #719F6C;
  border: none;
  color: #ffffff;
  font-family: 'Arial', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
}

.analyze-button:hover {
  background-color: #5a9a54;
  /* hover:bg-green-600 */
}

.chart {
  position: absolute;
  width: 595px;
  height: 346px;
  top: 100px !important;
  margin-left: 72px;
}

.title {
  margin-left: 49px;
  font-family: 'Kaisei HarunoUmi', sans-serif;
  font-weight: 400;
  font-size: 30px;
  line-height: 100%;
  letter-spacing: 0%;
}

.analysis {
  width: 100%;
  height: 1905px;
  display: grid;
  grid-template-columns: repeat(2, 3fr);
  grid-template-rows: repeat(2, 500px);
}

.analyze {
  border: red solid 1px;
  position: relative;
}

.box-1 {
  grid-row: 1;
  grid-column-start: 3;
  grid-column-end: 5;
}

.box-2 {
  grid-row: 1;
  grid-column-start: 5;
  grid-column-end: 9;
}

.box-3 {
  grid-row: 2;
  grid-column-start: 3;
  grid-column-end: 5;
}

.box-4 {
  grid-row: 2;
  grid-column-start: 5;
  grid-column-end: 9;
}

.box-5 {
  grid-row: 3;
  grid-column-start: 3;
  grid-column-end: 5;
}

.box-6 {
  grid-row: 3;
  grid-column-start: 5;
  grid-column-end: 9;
}

.selection {
  width: 100%;
  font-family: Kaisei Decol;
  font-weight: 400;
  font-size: 30px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #ffffff;
  background: transparent;
  border: none;
  text-align: left;
}

.border {
  display: flex;
}

.border img {
  width: 63px;
  height: 63px;
}

.VIPshop {
  width: 151px;
  height: 229px;
  grid-column: 1;
  grid-row-start: 1;
  grid-row-end: 5;
  margin-left: 105px;
}

.upper .title {
  grid-column: 10;
  grid-row-start: 1;
  grid-row-end: 4;
  writing-mode: vertical-rl;
  font-family: Kaisei Decol;
  font-weight: 400;
  font-size: 19px;
  line-height: 100%;
  color: #fff;
  letter-spacing: 0.5em;
  white-space: nowrap;
  justify-self: end;
  margin-right: 50px;
  text-align: center;
}

.forms-container {
  display: flex;
  padding: 20px 5%;
  /* Add some padding */
  background-color: #f0f5e6;
  /* Light green background */
  gap: 40px;
  /* Space between columns */
}

.column {
  flex: 1;
  /* Each column takes equal width */
  display: flex;
  flex-direction: column;
  gap: 30px;
  /* Space between forms in a column */
}

.form-section {
  background-color: #e6f0d8;
  /* Slightly darker green for forms */
  padding: 25px;
  border-radius: 15px;
  border: 1px solid #c8d9b8;
  /* Subtle border */
}

.form-section h3 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 1px solid #c8d9b8;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.submit-button {
  background-color: #719f6c;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
}

.submit-button:hover {
  background-color: #5a9a54;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  /* Allow items to wrap */
}

.form-group label {
  min-width: 80px;
  /* Ensure labels align */
  margin-right: 10px;
  color: #555;
  font-size: 15px;
}

.form-group input[type="text"],
.form-group textarea {
  flex-grow: 1;
  /* Allow input/textarea to fill space */
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  min-width: 100px;
  /* Minimum width for inputs */
}

/* Specific width for date inputs */
.form-group input[placeholder="年"],
.form-group input[placeholder="月"],
.form-group input[placeholder="日"] {
  flex-grow: 0;
  width: 50px;
  /* Fixed width for date parts */
  margin-right: 5px;
  text-align: center;
}

.form-group textarea {
  height: 100px;
  /* Default height */
  resize: vertical;
  /* Allow vertical resize */
  width: 100%;
  /* Take full width in its line */
  margin-top: 5px;
  /* Add space above textarea */
}

/* Adjust alignment for textareas */
.form-group label[for="textarea"] {
  /* Assuming you add an id="textarea" or similar */
  align-self: flex-start;
  /* Align label to top */
  margin-top: 8px;
  /* Align with textarea padding */
}


.file-button {
  background-color: #fff;
  color: #555;
  border: 1px solid #ccc;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;
  /* Space between buttons */
}

.file-button:hover {
  background-color: #f0f0f0;
}

.form-group input[type="radio"] {
  margin-left: 10px;
  margin-right: 3px;
}

.form-group input[type="radio"]+label {
  margin-right: 15px;
  /* Space between radio options */
  min-width: auto;
  /* Override default min-width */
  font-size: 14px;
}

/* Adjustments for specific forms if needed */
.financial-coop .form-group label,
.insurance-coop .form-group label {
  min-width: 90px;
  /* Slightly wider labels */
}

.nutritionist-coop .form-group label {
  min-width: 100px;
  /* Wider labels for nutritionist form */
}

.nutritionist-coop .form-group input[type="text"] {
  max-width: 150px;
  /* Limit name input width */
}
</style>
