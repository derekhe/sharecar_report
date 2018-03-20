fetch("./analysis/brands.json")
  .then((d) => {
    return d.json()
  }).then((d) => {
  const series = d.map((i) => {
    return {name: i.brand, value: i.c};
  });

  const x = d.map((i) => {
    return i.brand;
  });

  const myChart = echarts.init(document.getElementById('brands'), themeName);
  const option = {
    title: {
      text: '车型品牌分布',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [{
      name: '车型品牌分布',
      type: 'pie',
      radius: '40%',
      data: series,
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