import {useEffect, useState} from 'react'
import { NavLink, Route } from "react-router-dom";
import SlideRoutes from "react-slide-routes";

import './App.css'
import List from "./pages/List.tsx";
import Stats from "./pages/Stats.tsx";
import Graphs from "./pages/Graphs.tsx";
import {useBackButton, useInitData, useMainButton, useWebApp} from "@tma.js/sdk-react";
import Measure from "./pages/Measure.tsx";

function App() {
  const initData = useInitData()
  const backButton = useBackButton()
  const mainButton = useMainButton()
  const webApp = useWebApp()

  const [count, setCount] = useState(0)

  const [minSugar, setMinSugar] = useState(44)
  const [maxSugar, setMaxSugar] = useState(72)
  const [maxSugarMeal, setMaxSugarMeal] = useState(100)

  const _measures = [
    {
      id: 0,
      sugar: 53,
      date: "091023",
      day: "09",
      month: "10",
      year: "23",
      time: "01:09",
      mood: 1,
      mealType: 0,
      comment: ""
    }
  ]
  _measures.push(
    {
      id: 2,
      sugar: 33,
      date: "041023",
      day: "04",
      month: "10",
      year: "23",
      time: "11:11",
      mood: 3,
      mealType: 0,
      comment: ""
    });
  _measures.push(
    {
      id: 1,
      sugar: 72,
      date: "011023",
      day: "01",
      month: "10",
      year: "23",
      time: "09:01",
      mood: 4,
      mealType: 0,
      comment: ""
    });
  _measures.push(
    {
      id: 3,
      sugar: 66,
      date: "051023",
      day: "05",
      month: "10",
      year: "23",
      time: "23:45",
      mood: 5,
      mealType: 0,
      comment: ""
  });
  _measures.push(
    {
      id: 4,
      sugar: 80,
      date: "081023",
      day: "08",
      month: "10",
      year: "23",
      time: "08:09",
      mood: 2,
      mealType: 4,
      comment: "gdfksgjkdsfgjkfds\\nfsgfdgsdg"
  });
  _measures.push(
    {
      id: 7,
      sugar: 55,
      date: "091023",
      day: "09",
      month: "10",
      year: "23",
      time: "08:33",
      mood: 1,
      mealType: 1,
      comment: "Almost died"
    });
  _measures.push(
    {
      id: 5,
      sugar: 60,
      date: "091023",
      day: "11",
      month: "10",
      year: "23",
      time: "08:09",
      mood: 1,
      mealType: 1,
      comment: "Almost died"
  });
  _measures.push(
    {
      id: 6,
      sugar: 77,
      date: "091023",
      day: "09",
      month: "10",
      year: "23",
      time: "08:19",
      mood: 1,
      mealType: 1,
      comment: "Almost died"
    });
  _measures.push(
    {
      id: 7,
      sugar: 60,
      date: "101023",
      day: "10",
      month: "10",
      year: "23",
      time: "08:09",
      mood: 1,
      mealType: 1,
      comment: "Almost died"
    });

  useEffect(() => {
    const listener = () => webApp.close()
    backButton.on('click', listener)
    backButton.show()

    return () => {
      backButton.off('click', listener)
      backButton.hide()
    }
  }, [backButton, webApp])

  const [measures, setMeasures] = useState(_measures);

  const propsObj = {
    initData, backButton, mainButton,
    measures, setMeasures,
    minSugar, setMinSugar,
    maxSugar, setMaxSugar,
    maxSugarMeal, setMaxSugarMeal
  }

  return (
    <>
      {/*<Navbar />*/}
      <nav>
        <NavLink to="/measure">+</NavLink>
        <NavLink to="/" end>List</NavLink>
        <NavLink to="/graphs">Graphs</NavLink>
        <NavLink to="/stats">Statistics</NavLink>
      </nav>
      <div className="container">
        <SlideRoutes>
          <Route path="/diabetes-diary/" element={ <List {...propsObj} /> }/>
          <Route path="/measure" element={ <Measure {...propsObj} /> }/>
          <Route index path="/" element={ <List {...propsObj} /> }/>
          <Route path="/graphs" element={ <Graphs {...propsObj} /> }/>
          <Route path="/stats" element={ <Stats {...propsObj} /> }/>
        </SlideRoutes>
        <button className="main-button" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
