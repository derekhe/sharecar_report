fetch("./analysis/seats.json")
  .then((d) => {
    return d.json()
  }).then((d) => {
  const series = d.map(i => ({name: i.seats, value: i.c}));


  const myChart = echarts.init(document.getElementById('seats'), themeName);
  const option = {
    title: {
      text: '座位数量分布',
      left: 'center',
    },
    series: [{
      name: '座位数量分布',
      type: 'pie',
      radius: '40%', data: series,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  myChart.setOption(option);
});