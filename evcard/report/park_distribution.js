fetch("./analysis/park_distrubution.json")
  .then((d) => {
    return d.json()
  }).then((d) => {
  d = _.sortBy(d.filter((i) => {
    return i.count !== 0;
  }), ['count']);

  let data = [];
  let convertedData = [];
  let categoryData = [];

  d.forEach((i) => {
    let provinceNames = _.find(CITY_CAPITAL_MAPPING, {'abbreviation': i.province}).name;
    data.push({
      name: provinceNames,
      value: i.count
    });

    let capital_city_name = _.find(CITY_CAPITAL_MAPPING, {'abbreviation': i.province}).capital;

    convertedData.push({
        name: provinceNames,
        value: _.find(CITIES, {'name': capital_city_name}).geoCoord.concat(i.count)
      }
    );

    categoryData.push(provinceNames);
  });

  const myChart = echarts.init(document.getElementById('park_distribution'), themeName);
  option = {
    tooltip: {
      trigger: 'item'
    },
    title: [
      {
        text: '停车场数量分布',
        left: 'center',
      }],
    grid: {
      backgroundColor: "#FF0000",
      right: 40,
      top: 100,
      bottom: 40,
      width: '30%'
    },
    xAxis: {
      type: 'value',
      scale: true,
      position: 'top',
      boundaryGap: false,
      splitLine: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        margin: 2,
        textStyle: {}
      },
    },
    yAxis: {
      type: 'category',
      nameGap: 16,
      axisLine: {
        show: true,
        lineStyle: {}
      },
      axisTick: {
        show: false,
        lineStyle: {}
      },
      axisLabel: {
        interval: 0,
        textStyle: {}
      },
      data: categoryData
    },
    bmap: {
      center: [120.39392, 32.916927],
      zoom: 5,
      roam: false,
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
            "featureType": "highway",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
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
            "featureType": "highway",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "background",
            "elementType": "all",
            "stylers": {
              "visibility": "on"
            }
          },
          {
            "featureType": "poilabel",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "districtlabel",
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
          },
          {
            "featureType": "subway",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "local",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "arterial",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "highway",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "city",
            "elementType": "all",
            "stylers": {
              "visibility": "on"
            }
          }
        ]
      }
    },
    series: [{
      type: 'effectScatter',
      coordinateSystem: 'bmap',
      data: convertedData,
      symbolSize: function (val) {
        return Math.log(val[2]) * 2;
      },
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: true
        },
        emphasis: {
          show: true
        }
      },
      itemStyle: {
        normal: {
          position: 'right',
          show: true
        }
      }
    }, {
      id: 'bar',
      type: 'bar',
      symbol: 'none',
      data: data,
      itemStyle: {
        normal: {
          position: 'right',
          show: true,
          color: "#D87C7C"
        }
      }
    }]
  };

  myChart.setOption(option);
});