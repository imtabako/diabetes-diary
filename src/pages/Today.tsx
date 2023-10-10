import React from 'react';
import Measure from "./Measure.tsx";

function Today(props) {
  return (
    <>
      <h1>Today</h1>
      <Measure {...props}/>
    </>
  );
}

export default Today;