fetch("./analysis/car_names.json")
  .then((d) => {
    return d.json()
  }).then((d) => {

  const series = d.map((i) => {
    return {name: i.name, value: i.count};
  });

  const x = d.map((i) => {
    return i.name
  });

  const myChart = echarts.init(document.getElementById('car_type'), themeName);
  const option = {
    title: {
      text: '车型分布',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [{
      name: '车辆种类',
      type: 'pie',
      radius: '40%',
      data: series,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }}]
  };

  myChart.setOption(option);
});