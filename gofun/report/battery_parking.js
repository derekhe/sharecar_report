fetch("./analysis/battery_parking_川A41F1Z.json")
  .then((d) => {
    return d.json()
  }).then((d) => {
  const battery = d.map((i) => {
    return {
      name: new Date(i.start_t), value: [
        new Date(i.start_t),
        i.battery,
        new Date(i.start_t),
        i.start_p,
        new Date(i.end_t),
        i.end_p
      ]
    }
  });

  const parkings = [];
  d.map((i) => {
    parkings.push({
      name: new Date(i.start_t), value: [
        new Date(i.start_t),
        i.parking ? 100 : 0
      ]
    });
  });

  const myChart = echarts.init(document.getElementById('battery_parking'), themeName);
  const option = {
    title: {
      text: '电池电量变化',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        params = params[0];
        const date = new Date(params.name);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} 电量:${params.value[1]}<br>${params.value[2]} ${params.value[3]}<br>${params.value[4]} ${params.value[5]}`;
      },
      axisPointer: {
        animation: false
      }
    },
    toolbox: {},
    dataZoom: [ {
      start: 30,
      end: 70,
      handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      handleSize: '80%',
      handleStyle: {
        color: '#fff',
        shadowBlur: 3,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffsetX: 2,
        shadowOffsetY: 2
      }
    }],
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
    },
    series: [{
      name: '电池电量',
      type: 'line',
      showSymbol: true,
      hoverAnimation: true,
      data: battery
    }, {
      name: '停车',
      type: 'line',
      step: "first",
      showSymbol: false,
      hoverAnimation: true,
      data: parkings,
      areaStyle: {},
      smooth: false
    }]
  };
  myChart.setOption(option);
});