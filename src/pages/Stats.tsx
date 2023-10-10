import React, {useEffect, useState} from 'react';

import CanvasJSReact from '@canvasjs/react-charts'

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Stats({
  measures,
  mainButton,
  minSugar, maxSugar
               }) {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)

  useEffect(() => {
    mainButton.disable().hide()
  }, [mainButton]);

  useEffect(() => {
    setGood(0)
    setBad(0)
    measures.map((m) => {
      if (m.sugar >= maxSugar || m.sugar <= minSugar) {
        setBad(bad + 1)
      } else {
        setGood(good + 1)
      }
    })
  }, [measures]);
  return (
    <>
      <h1>Stats</h1>
      <CanvasJSChart options={
        {
          innerRadius: "75%",
          radius: "100%",
          startAngle: 90,
          type: "doughnut",
          dataPoints: [
            { y: {good}, color: "green" },
            { y: {bad}, color: "red" }
          ]
        }
      } />
    </>
  );
}

export default Stats;