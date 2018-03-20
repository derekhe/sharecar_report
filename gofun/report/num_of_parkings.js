fetch("./analysis/num_of_parkings.json")
  .then((d) => {
    return d.json()
  }).then((d) => {
  const myChart = echarts.init(document.getElementById('num_of_parkings'), themeName);
  const option = {
    title: {
      text: '三个月内使用次数分布',
      left: 'center',
    },
    xAxis: {
      type: 'category',
      data: d[1],
      axisTick: {
        alignWithLabel: true
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: d[0],
      type: 'line',
      label: {
        normal: {
          show: false
        }
      },
    }]
  }
  myChart.setOption(option);
});