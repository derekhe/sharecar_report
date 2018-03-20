fetch("./analysis/average_cars_per_park.json")
  .then((d) => {
    return d.json()
  }).then((d) => {
  const data = d.map((i) => {
    return {"name": _.find(CITY_CAPITAL_MAPPING, {'abbreviation': i.province}).name, "value": i.count}
  });

  const myChart = echarts.init(document.getElementById('average_cars_per_park'), themeName);
  const option = {
    title: {
      text: '多少汽车共用一个停车场',
      left: 'center',
    },
    grid: {
      bottom: '25%'
    },
    xAxis: {
      type: 'category',
      data: d.map(i => {
        return _.find(CITY_CAPITAL_MAPPING, {'abbreviation': i.province}).name
      }),
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: d.map(i => {
        return Math.ceil(i.count * 10) / 10;
      }),
      type: 'bar',
      label: {
        normal: {
          show: true,
          position: 'inside',
        }
      },
    }]
  };

  myChart.setOption(option);
});