<template>
  <div class="apply-comp-container">
    <!-- Section 1: 健康保單申請 -->
    <div class="section section-1">
      <div class="section-header">
        <h2 class="section-title">健康保單申請</h2>
        <button class="apply-button" @click="submitPolicyApplication">一鍵申請</button>
      </div>

      <div class="form-fields">
        <!-- Start Date -->
        <div class="period-selector">
          <span class="date-label">起始日期 :</span>
          <input type="date" v-model="formData.policyApplication.startDate.fullDate" class="date-input" />
          <div class="manual-date-inputs">
            <input type="number" v-model.number="formData.policyApplication.startDate.year" placeholder="YYYY"
              class="year-input" />
            <span>年</span>
            <input type="number" v-model.number="formData.policyApplication.startDate.month" placeholder="MM"
              class="month-input" min="1" max="12" />
            <span>月</span>
            <input type="number" v-model.number="formData.policyApplication.startDate.day" placeholder="DD"
              class="day-input" min="1" max="31" />
            <span>日</span>
          </div>
        </div>

        <!-- End Date -->
        <div class="period-selector">
          <span class="date-label">終止日期 :</span>
          <input type="date" v-model="formData.policyApplication.endDate.fullDate" class="date-input" />
          <div class="manual-date-inputs">
            <input type="number" v-model.number="formData.policyApplication.endDate.year" placeholder="YYYY"
              class="year-input" />
            <span>年</span>
            <input type="number" v-model.number="formData.policyApplication.endDate.month" placeholder="MM"
              class="month-input" min="1" max="12" />
            <span>月</span>
            <input type="number" v-model.number="formData.policyApplication.endDate.day" placeholder="DD"
              class="day-input" min="1" max="31" />
            <span>日</span>
          </div>
        </div>

        <!-- Insurance Company -->
        <div class="form-row">
          <label class="form-label">保險公司：</label>
          <select class="select-field" v-model="formData.policyApplication.insuranceCompany"
            style="background-image: url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3E%3C/svg%3E');">
            <option value="">請選擇</option>
            <!-- Add options here, e.g., <option value="companyA">Company A</option> -->
          </select>
        </div>

        <!-- Output Format -->
        <div class="form-row">
          <label class="form-label">輸出格式：</label>
          <select class="select-field" v-model="formData.policyApplication.outputFormat"
            style="background-image: url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3E%3C/svg%3E');">
            <option value="" disabled>ex: word/pdf/png...</option>
            <option value="word">Word</option>
            <option value="pdf">PDF</option>
            <option value="png">PNG</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Section 2: 健康信用下載 -->
    <div class="section section-2">
      <div class="section-header">
        <h2 class="section-title">健康信用下載</h2>
        <button class="apply-button" @click="submitCreditDownload">一鍵申請</button>
      </div>

      <div class="form-fields">
        <!-- Start Date -->
        <div class="period-selector">
          <span class="date-label">起始日期 :</span>
          <input type="date" v-model="formData.creditDownload.startDate.fullDate" class="date-input" />
          <div class="manual-date-inputs">
            <input type="number" v-model.number="formData.creditDownload.startDate.year" placeholder="YYYY"
              class="year-input" />
            <span>年</span>
            <input type="number" v-model.number="formData.creditDownload.startDate.month" placeholder="MM"
              class="month-input" min="1" max="12" />
            <span>月</span>
            <input type="number" v-model.number="formData.creditDownload.startDate.day" placeholder="DD"
              class="day-input" min="1" max="31" />
            <span>日</span>
          </div>
        </div>

        <!-- End Date -->
        <div class="period-selector">
          <span class="date-label">終止日期 :</span>
          <input type="date" v-model="formData.creditDownload.endDate.fullDate" class="date-input" />
          <div class="manual-date-inputs">
            <input type="number" v-model.number="formData.creditDownload.endDate.year" placeholder="YYYY"
              class="year-input" />
            <span>年</span>
            <input type="number" v-model.number="formData.creditDownload.endDate.month" placeholder="MM"
              class="month-input" min="1" max="12" />
            <span>月</span>
            <input type="number" v-model.number="formData.creditDownload.endDate.day" placeholder="DD" class="day-input"
              min="1" max="31" />
            <span>日</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const createDateObject = () => ({
  year: null,
  month: null,
  day: null,
  fullDate: '' // YYYY-MM-DD format for input type="date"
});

const formData = ref({
  policyApplication: {
    startDate: createDateObject(),
    endDate: createDateObject(),
    insuranceCompany: '',
    outputFormat: ''
  },
  creditDownload: {
    startDate: createDateObject(),
    endDate: createDateObject()
  }
});

// Helper function to format number to two digits (e.g., 1 -> 01)
const pad = (num) => String(num).padStart(2, '0');

// Helper function to check if year, month, day are valid numbers
const isValidDatePart = (part) => typeof part === 'number' && !isNaN(part) && part > 0;

// Synchronization logic
const setupDateSync = (dateObject) => {
  // Watch fullDate (from calendar input) and update year, month, day
  watch(() => dateObject.fullDate, (newFullDate) => {
    if (newFullDate && typeof newFullDate === 'string') {
      const parts = newFullDate.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);
        // Avoid infinite loop by checking if values actually changed
        if (dateObject.year !== year || dateObject.month !== month || dateObject.day !== day) {
          dateObject.year = year;
          dateObject.month = month;
          dateObject.day = day;
        }
      }
    } else if (!newFullDate) {
      // Clear manual inputs if calendar is cleared, unless they were already null
      if (dateObject.year !== null || dateObject.month !== null || dateObject.day !== null) {
        dateObject.year = null;
        dateObject.month = null;
        dateObject.day = null;
      }
    }
  });

  // Watch year, month, day (manual inputs) and update fullDate
  watch([() => dateObject.year, () => dateObject.month, () => dateObject.day], ([year, month, day]) => {
    if (isValidDatePart(year) && isValidDatePart(month) && isValidDatePart(day)) {
      // Basic validation for month/day range (can be improved)
      if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
        const newFullDate = `${year}-${pad(month)}-${pad(day)}`;
        // Avoid infinite loop
        if (dateObject.fullDate !== newFullDate) {
          dateObject.fullDate = newFullDate;
        }
      } else {
        // If date parts are invalid, clear fullDate unless it's already empty
        if (dateObject.fullDate !== '') {
          dateObject.fullDate = '';
        }
      }
    } else {
      // If any part is missing or invalid, clear fullDate unless it's already empty
      if (dateObject.fullDate !== '') {
        dateObject.fullDate = '';
      }
    }
  });
};

// Setup synchronization for all date objects
setupDateSync(formData.value.policyApplication.startDate);
setupDateSync(formData.value.policyApplication.endDate);
setupDateSync(formData.value.creditDownload.startDate);
setupDateSync(formData.value.creditDownload.endDate);


// Placeholder submit functions
const submitPolicyApplication = () => {
  console.log("Submitting Policy Application:", JSON.parse(JSON.stringify(formData.value.policyApplication)));
  // Add actual POST request logic here
  // Example: axios.post('/api/policy-application', formData.value.policyApplication)
};

const submitCreditDownload = () => {
  console.log("Submitting Credit Download:", JSON.parse(JSON.stringify(formData.value.creditDownload)));
  // Add actual POST request logic here
  // Example: axios.post('/api/credit-download', formData.value.creditDownload)
};

</script>

<style scoped>
/* General Styles */
.apply-comp-container {
  padding: 2rem;
  /* p-8 */
  /* bg-green-100 */
  min-height: 100vh;
  /* min-h-screen */
  font-family: sans-serif;
  /* font-sans */
}

.section {
  margin-bottom: 3rem;
  /* mb-12 on section-1 */
}

.section-header {
  display: flex;
  /* flex */
  justify-content: space-between;
  /* justify-between */
  align-items: center;
  /* items-center */
  margin-bottom: 1.5rem;
  /* mb-6 */
  position: relative;
  /* Needed for absolute positioning of button */
}

.section-title {
  margin-left: 49px;
  font-family: 'Kaisei HarunoUmi', sans-serif;
  font-weight: 400;
  font-size: 30px;
  line-height: 100%;
  color: #374151;
  /* Added color back */
}

.apply-button {
  /* Removed absolute positioning for better flow */
  cursor: pointer;
  /* margin-left: 500px; */
  /* Removed fixed margin */
  /* margin-top: 5px; */
  /* Removed fixed margin */
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
  flex-shrink: 0;
  /* Prevent button from shrinking */
}

.apply-button:hover {
  background-color: #5a9a54;
  /* hover:bg-green-600 */
}

.form-fields>*:not(:last-child) {
  margin-bottom: 1rem;
  /* space-y-4 */
}

.form-row {
  display: flex;
  /* flex */
  align-items: center;
  /* items-center */
}

.form-row>*:not(:last-child) {
  margin-right: 0.5rem;
  /* space-x-2 */
}

.form-label {
  width: 6rem;
  /* w-24 */
  text-align: right;
  /* text-right */
  color: #4b5563;
  /* text-gray-600 */
  flex-shrink: 0;
  /* Prevent label from shrinking */
}

.form-row span {
  color: #4b5563;
  /* text-gray-600 */
}

/* Input and Select Styles */
input[type="text"],
select {
  padding: 0.25rem;
  /* p-1 */
  border: 1px solid #000;
  /* border border-black */
  background-color: white;
  /* bg-white on select */
}

.input-year {
  width: 5rem;
  /* w-20 */
  border-radius: 1rem;
  /* rounded-lg */
}

.input-month-day {
  width: 3rem;
  /* w-12 */
  border-radius: 9999px;
  /* rounded-full */
  text-align: center;
  /* text-center */
}

.select-field {
  flex-grow: 1;
  /* flex-grow */
  border-radius: 1rem;
  /* rounded-lg */
  appearance: none;
  /* appearance-none */
  padding-right: 2rem;
  /* pr-8 */
  background-repeat: no-repeat;
  /* bg-no-repeat */
  background-position: right 0.5rem center;
  /* bg-right */
  background-size: 1.5em 1.5em;
  /* from previous style */
}

/* Basic styling for dropdown arrow (already provided) */
select {
  background-position: right 0.5rem center;
  background-size: 1.5em 1.5em;
}

/* Styles for new date input structure */
.period-selector {
  display: flex;
  align-items: center;
  /* Adjust spacing as needed */
}

.date-label {
  width: 6rem;
  /* Match form-label width */
  text-align: right;
  margin-right: 0.5rem;
  /* space-x-2 */
  color: #4b5563;
  /* text-gray-600 */
  flex-shrink: 0;
}

.date-input {
  padding: 0.25rem;
  border: 1px solid #000;
  border-radius: 0.25rem;
  /* Optional: slight rounding */
  margin-right: 1rem;
  /* Space between calendar and manual inputs */
  /* Adjust width as needed */
  width: 150px;
  background-color: white;
}

.manual-date-inputs {
  display: flex;
  align-items: center;
}

.manual-date-inputs>*:not(:last-child) {
  margin-right: 0.5rem;
  /* space-x-2 */
}

.manual-date-inputs span {
  color: #4b5563;
  /* text-gray-600 */
}

.manual-date-inputs input[type="number"] {
  padding: 0.25rem;
  /* p-1 */
  border: 1px solid #000;
  /* border border-black */
  background-color: white;
  text-align: center;
}

.year-input {
  width: 4.5rem;
  /* Adjust width */
  border-radius: 1rem;
  /* rounded-lg */
}

.month-input,
.day-input {
  width: 3rem;
  /* w-12 */
  border-radius: 9999px;
  /* rounded-full */
}
</style>
