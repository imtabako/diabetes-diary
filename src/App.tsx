import { useState } from 'react'
import { NavLink, Route } from "react-router-dom";
import SlideRoutes from "react-slide-routes";

import './App.css'
import List from "./pages/List.tsx";
import Today from "./pages/Today.tsx";
import Graphs from "./pages/Graphs.tsx";
import Stats from "./pages/Stats.tsx";
import {useMainButton} from "@tma.js/sdk-react";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/*<Navbar />*/}
      <nav>
        <NavLink to="/today">Today</NavLink>
        <NavLink to="/" end>List</NavLink>
        <NavLink to="/graphs">Graphs</NavLink>
        <NavLink to="/stats">Statistics</NavLink>
      </nav>
      <div className="container">
        <SlideRoutes>
          <Route path="/today" element={ <Today /> }/>
          <Route index path="/" element={ <List /> }/>
          <Route path="/graphs" element={ <Graphs /> }/>
          <Route path="/stats" element={ <Stats /> }/>
        </SlideRoutes>
        <button className="main-button" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
