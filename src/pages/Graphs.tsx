// import CanvasJSReact from '@canvasjs/react-charts'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {CanvasJSReact} from '/src/canvasjs.react.js'

import './Graphs.css'

function compareDateTimes(a, b) {
  const y = Number(a.year) - Number(b.year);
  const M = Number(a.month) - Number(b.month);
  const d = Number(a.day) - Number(b.day);
  const h = Number(a.time.substring(0,2)) - Number(b.time.substring(0, 2));
  const m = Number(a.time.substring(3,5)) - Number(b.time.substring(3, 5));

  if (y == 0) {
    if (M == 0) {
      if (d == 0) {
        if (h == 0) {
          return m;
        }
        return h;
      }
      return d;
    }
    return M;
  }
  return y;
}

function Graphs({
  measures,
  minSugar, maxSugar
                }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const CanvasJS = CanvasJSReact.CanvasJS;
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  measures.sort((a, b) => compareDateTimes(a, b))

  const measuresPoints = measures.map((m) => (
    {
      x: new Date(Number(m.year) + 2000, Number(m.month) - 1, Number(m.day),
        Number(m.time.substring(0,2)), Number(m.time.substring(3, 5))),
      y: m.sugar / 10
    }
  ))

  const delta = measuresPoints[0].x - measuresPoints[measuresPoints.length - 1].x

  return (
    <>
      <h1>Graphs</h1>
      <CanvasJSChart options={{
        title:{
          text: ""
        },
        animationEnabled: true,
        animationDuration: 300,
        toolTip:{
          enabled: false   //enable here
        },
        axisX: {
          valueFormatString: "DD MMM",
          crosshair: {
            enabled: true,
            snapToDataPoint: true
          }
        },
        axisY: {
          prefix: "",
          interval: 1,
          gridThickness: "0.4",
          gridDashType: "dash",
          crosshair: {
            enabled: true,
            snapToDataPoint: true
          }
        },
        data: [
        {
          lineColor: "#fc7a2c",
          markerColor: "#ec6a1c",
          markerType: "circle",
          markerSize: 6,
          yValueFormatString: "#.#",
          xValueFormatString: "DD MMMM HH:mm",
          type: "spline",
          dataPoints: measuresPoints
        },
        {
          type: "rangeArea",
          color: "green",
          lineColor: "rgba(0,0,0,0)",
          fillOpacity: "0.1",
          markerType: "none",
          xValueFormatString: "",
          yValueFormatString: "",
          dataPoints: [
            { x: measuresPoints[0].x - delta, y: [minSugar/10, maxSugar/10] },
            { x: measuresPoints[measuresPoints.length-1].x + delta, y: [minSugar/10, maxSugar/10] },
          ]
        },
        {
          type: "area",
          enabled: "false",
          color: "red",
          lineColor: "rgba(0,0,0,0)",
          fillOpacity: "0.1",
          markerType: "none",
          xValueFormatString: "",
          yValueFormatString: "",
          dataPoints: [
            { x: measuresPoints[0].x - delta, y: minSugar/10 },
            { x: measuresPoints[measuresPoints.length-1].x + delta, y: minSugar/10 },
          ]
        },
        ]
      }} />
    </>
  );
}

export default Graphs;