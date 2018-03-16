fetch("./analysis/year.json")
  .then((d) => {
    return d.json()
  }).then((d) => {

  const series = d.map((i) => ({name: i.year, value: i.c}));

  const x = d.map((i) => i.year);

  const myChart = echarts.init(document.getElementById('years'), themeName);
  const option = {
    title: {
      text: '车辆年代分布',
      left: 'center',
    },
    series: [{
      name: '车型品牌分布',
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