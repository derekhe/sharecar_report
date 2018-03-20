fetch("./analysis/car_increase.json")
  .then((d) => {
    return d.json()
  }).then((d) => {
  const data = d.map((i) => {
    return {"name": i.date, "value": i.car_count}
  });

  const myChart = echarts.init(document.getElementById('car_increase'), themeName);
  let category = d.map(i => {
    return i.date
  });

  console.log(category);

  const option = {
    title: {
      text: '共享汽车数量增长',
      left: 'center',
    },
    xAxis: {
      type: 'category',
      data: category,
      axisLabel: {
        rotate: 45
      },
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: d.map(i => {
        return i.car_count
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