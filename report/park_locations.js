fetch("./analysis/park_locations.json")
  .then((d) => {
    return d.json()
  }).then((d) => {
  const data = d.map((i) => {
    return {name: i.parking_name, value: [i.location[0], i.location[1]]};
  });

  const myChart = echarts.init(document.getElementById('park_locations'), themeName);
  myChart.setOption(option = {
    title: {
      text: '停车场分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b} {c}'
    },
    bmap: {
      center: [104.073485, 30.661538],
      zoom: 11,
      roam: true,
      mapStyle: {
        styleJson: [
          {
            "featureType": "all",
            "elementType": "all",
            "stylers": {
              "lightness": 10,
              "saturation": -100
            }
          },
          {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": {
              "visibility": "on"
            }
          },
          {
            "featureType": "district",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "railway",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          }]
      }
    },
    series: [
      {
        name: 'park',
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        data: data,
        showEffectOn: 'emphasis',
        itemStyle: {
          normal: {
            color: "#ee5a34",
            shadowBlur: 10,
            shadowColor: '#a6a6a6'
          }
        },
      }
    ]
  });

  myChart.setOption(option);
});