<template>
  <div id="pie-chart-container"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import Highcharts from 'highcharts'

const colors = ['#000', '#B4C5FF', '#FF7878', '#F2F87D', '#90FF86']

const legend_names = [
  '你好，你怎麼看到我的＼（〇_ｏ）／',
  '吃貨危機',
  '吃貨警戒',
  '吃貨專家',
  '精緻吃貨',
]

const props = defineProps({
  charData: {
    type: Object,
    default: () => ({
      protein: 30,
      starch: 30,
      cellulose: 40,
    }),
  },
})

const pieData = [
  {
    name: '蛋白質',
    y: props.charData.protein,
    color: `${colors[1]}`,
    legendColor: colors[1],
    legendName: legend_names[1],
  },
  {
    name: '澱粉',
    y: props.charData.starch,
    color: `${colors[2]}`,
    legendColor: colors[2],
    legendName: legend_names[2],
  },
  {
    name: '纖維素',
    y: props.charData.cellulose,
    color: `${colors[4]}`,
    legendColor: colors[4],
    legendName: legend_names[4],
  },
].map((d) => ({
  name: typeof d.name === 'string' ? d.name.trim() : '未命名',
  y: d.y ?? 0,
  color: d.color ?? colors[0],
  legendColor: d.legendColor ?? colors[0],
  legendName: d.legendName ?? '精緻吃貨',
}))

onMounted(() => {
  Highcharts.setOptions({
    lang: {
      decimalPoint: '.',
      thousandsSep: ',',
    },
  })

  Highcharts.chart('pie-chart-container', {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
    },
    title: {
      text: '吃貨營養素分析',
    },
    tooltip: {
      valueSuffix: '%',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
          distance: -50,
          filter: {
            property: 'percentage',
            operator: '>',
            value: 4,
          },
        },
        showInLegend: true,
      },
    },
    legend: {
      labelFormatter: function () {
        return `${this.legendName} `
      },
      useHTML: true,
    },
    series: [
      {
        name: 'Percentage',
        colorByPoint: true,
        data: pieData,
      },
    ],
  })
})
</script>

<style scoped>
#pie-chart-container {
  width: 600px;
  height: 400px;
}
</style>
