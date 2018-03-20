// 百度地图API功能
const map = new BMap.Map("container");
map.setMapStyle({
  styleJson: [
    {
      "featureType": "all",
      "elementType": "all",
      "stylers": {
        "lightness": 10,
        "saturation": -100
      }
    }
  ]
});

map.centerAndZoom(new BMap.Point(104.072335, 30.665017), 12);
map.enableScrollWheelZoom();

fetch("./analysis/battery_parking_沪HY1692.json")
  .then((d) => {
    return d.json()
  }).then((d) => {
  let locations = [];

  d.forEach((i) => {
    const l = i['position'].replace("(", "").replace(")").split(",");
    let point = new BMap.Point(parseFloat(l[0]), parseFloat(l[1]));
    locations.push({
      x: parseFloat(l[0]),
      y: parseFloat(l[1]),
      i
    });
  });

  let i = 0;
  setInterval(() => {
    i++;
    if (i > locations.length - 2) {
      i = 0;
    }

    map.clearOverlays();

    const sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
      scale: 0.6,//图标缩放大小
      strokeColor: '#fff',//设置矢量图标的线填充颜色
      strokeWeight: '2',//设置线宽
    });
    const icons = new BMap.IconSequence(sy, '10', '10%');

    let points = _.slice(locations, i, i + 6);
    const linePoints = points.map(i => {
      return new BMap.Point(i.x, i.y);
    });

    const markers = points.map(i => {
      let marker = new BMap.Marker(new BMap.Point(i.x, i.y));
      let label = new BMap.Label(`${moment(i.i.start_t).format("YYYY-MM-DD HH:mm")} ${i.i.start_p}<br/>`, {offset: new BMap.Size(20, -10)});
      marker.setLabel(label);

      map.addOverlay(marker);
    });

    const curve = new BMap.Polyline(linePoints, {
      icons: [icons],
      strokeWeight: '8',//折线的宽度，以像素为单位
      strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
      strokeColor: "#18a45b" //折线颜色
    });
    map.addOverlay(curve);
    map.panTo(_.last(linePoints));
  }, 2000)
});

