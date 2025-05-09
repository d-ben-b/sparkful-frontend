<template>
  <div class="bookkeeping-container">
    <div id="bookkeeping-chart-container" class="chart-area"></div>
    <div class="summary-area">
      <div class="summary-box income">
        <div>收入</div>
        <div>{{ totalIcome }}</div>
        <div class="change negative">-4,411 (23.5%)</div>
      </div>
      <div class="summary-box expense">
        <div>支出</div>
        <div>{{ totalExpense }}</div>
        <div class="change positive">+3,910 (33.2%)</div>
      </div>
      <div class="summary-box net-period">
        <div>本期收支</div>
        <div>-1,831</div>
        <div class="change negative">-6,000 (56%)</div>
      </div>
      <div class="summary-box total-balance">
        <div>總收支</div>
        <div>{{ totalBalance }}</div>
        <div class="change positive">+7,884 (13.5%)</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Highcharts from 'highcharts'

// Define props with default data
const props = defineProps({
  charData: {
    type: Object,
    default: () => ({
      categories: ['25年1月', '25年2月', '25年3月', '25年4月', '25年5月'],
      income: [2.5, 3.4, 4.2, 6.0, 5.2],
      expense: [1.0, 1.2, 3.3, 6.0, 2.8],
    }),
  },
})
const total = (array) => {
  if (props.charData && Array.isArray(array)) {
    const sum = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const totalValue = sum * 1000;
    return new Intl.NumberFormat('en-US').format(totalValue);
  }
  return '0';
}

// Calculate totals
const totalIcome = total(props.charData.income)
const totalExpense = total(props.charData.expense)
const Balance = props.charData.income.map((income, index) => income - props.charData.expense[index]);
const totalBalance = total(Balance)


onMounted(() => {
  Highcharts.chart('bookkeeping-chart-container', {
    chart: {
      backgroundColor: 'transparent', // Match background if needed
    },
    title: {
      text: null, // No main title for the chart itself
    },
    credits: {
      enabled: false, // Disable credits
    },
    xAxis: [
      {
        categories: props.charData.categories, // Use categories from props
        crosshair: true,
        labels: {
          style: {
            color: '#666666', // Axis label color
          },
        },
        lineColor: '#ccd6eb', // X-axis line color
        tickColor: '#ccd6eb', // X-axis tick color
      },
    ],
    yAxis: [
      {
        // Primary yAxis (Income/Expense)
        title: {
          text: '收支',
          style: {
            color: '#666666',
          },
        },
        labels: {
          formatter: function () {
            return new Intl.NumberFormat('zh-CN', {
              style: 'decimal',
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            }).format(this.value) + ' k';
          }, // Format labels as needed (e.g., thousands)
          style: {
            color: '#666666',
          },
        },
        gridLineColor: '#e6e6e6', // Color of grid lines
      },
      {
        // Secondary yAxis (Total Balance)
        title: {
          text: '總收支',
          style: {
            color: '#666666',
          },
        },
        labels: {
          formatter: function () {
            return new Intl.NumberFormat('zh-CN', {
              style: 'decimal',
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            }).format(this.value) + ' k';
          }, // Format labels as needed
          style: {
            color: '#666666',
          },
        },
        opposite: true,
        gridLineColor: '#e6e6e6', // Color of grid lines for secondary axis
      },
    ],
    tooltip: {
      shared: true, // Show tooltip for all series at a point
    },
    legend: {
      layout: 'horizontal', // Changed layout
      align: 'center', // Centered alignment
      verticalAlign: 'bottom', // Positioned at the bottom
      itemStyle: {
        color: '#333333', // Legend text color
      },
      itemHoverStyle: {
        color: '#000000',
      },
      itemHiddenStyle: {
        color: '#cccccc',
      },
      // Optional: remove background and border
      // backgroundColor: 'none',
      // borderWidth: 0
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        borderRadius: 5, // Rounded corners for columns
      },
      spline: {
        lineWidth: 3, // Make line thicker
        marker: {
          enabled: true, // Show markers on the line
          radius: 4,
        },
      },
    },
    series: [
      {
        name: '收入',
        type: 'column',
        yAxis: 0, // Use the primary axis
        data: props.charData.income, // Example data (in k)
        color: '#90EE90', // Light Green
        tooltip: {
          valueSuffix: ' k',
        },
      },
      {
        name: '支出',
        type: 'column',
        yAxis: 0, // Use the primary axis
        data: props.charData.expense, // Example data (in k) - Note: 3rd month expense matches income
        color: '#F08080', // Light Coral / Red
        borderColor: '#F08080', // Ensure border matches fill
        tooltip: {
          valueSuffix: ' k',
        },
      },
      {
        name: '總收支', // This seems to represent net income per period in the image line graph
        type: 'spline',
        yAxis: 1, // Use the secondary axis
        data: Balance, // Example data: Income - Expense (in k)
        color: '#FFD700', // Gold / Yellow
        tooltip: {
          valueSuffix: ' k',
        },
      },
    ],
  })
})
</script>

<style scoped>
.bookkeeping-container {
  width: 595px;
  height: 346px;
  top: 3px;
  left: 25px;
  padding: 0px;
  display: flex;
  /* background-color: #e6f2e6; */
  background: #E0F1CC;
  /* Light green background like image */
  border-radius: 30px;
  gap: 20px;
  /* Space between chart and summary */
  font-family: sans-serif;
  /* Basic font */
  color: #333;
  /* Default text color */
}

.chart-area {
  position: relative;
  top: 54px;
  flex: 3;
  min-width: 100px;
  border-radius: 30px;
}

#bookkeeping-chart-container {
  height: 300px;
  /* Or adjust as needed */
}

.summary-area {
  position: relative;
  top: 64px;
  flex: 1;
  /* Takes less space */
  display: grid;
  grid-template-columns: 100px 100px;
  /* Two columns */
  grid-template-rows: 100px 100px;
  /* Two rows */
  gap: 15px;
  /* Space between boxes */
  min-width: 250px;
  /* Minimum width for summary area */
}

.summary-box {
  padding: 15px;
  border-radius: 8px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* Center content vertically */
  align-items: flex-start;
  /* Align text to the start */
  font-size: 14px;
}

.summary-box div:first-child {
  /* Title */
  font-size: 12px;
  margin-bottom: 5px;
  opacity: 0.9;
}

.summary-box div:nth-child(2) {
  /* Main value */
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}

.summary-box .change {
  /* Change value */
  font-size: 12px;
}

.summary-box.income {
  background-color: #90ee90;
  /* Light Green */
}

.summary-box.expense {
  background-color: #f08080;
  /* Light Coral / Red */
}

.summary-box.net-period {
  background-color: #87ceeb;
  /* Sky Blue */
}

.summary-box.total-balance {
  background-color: #ffd700;
  /* Gold / Yellow */
  color: #555;
  /* Darker text for yellow background */
}

.change.positive {
  color: #3f873f;
  /* Darker green for positive change text or keep white/black */
  /* color: inherit; */
  /* Or inherit from parent */
}

.change.negative {
  color: #a84848;
  /* Darker red for negative change text or keep white/black */
  /* color: inherit; */
  /* Or inherit from parent */
}
</style>
