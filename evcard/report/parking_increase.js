fetch("./analysis/parking_increase.json")
  .then((d) => {
    return d.json()
  }).then((d) => {
  const data = d.map((i) => {
    return {"name": i.date, "value": i.parking_count}
  });

  const myChart = echarts.init(document.getElementById('parking_increase'), themeName);
  const option = {
    title: {
      text: '停车场数量增长',
      left: 'center',
    },
    xAxis: {
      type: 'category',
      data: d.map(i => {
        return i.date
      }),
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: d.map(i => {
        return i.parking_count
      }),
      type: 'line',
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
    }]
  };

  myChart.setOption(option);
});