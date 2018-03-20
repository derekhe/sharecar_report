fetch("./analysis/parking_hist.json")
  .then((d) => {
    return d.json()
  }).then((d) => {
  const myChart = echarts.init(document.getElementById('parking_hist'), themeName);
  const option = {
    title: {
      text: '停车时长分布',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: d[1],
      axisTick: {
        alignWithLabel: true
      }
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
      }
    }]
  }
  myChart.setOption(option);
});