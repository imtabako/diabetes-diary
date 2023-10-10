import {useEffect, useState} from "react";

import './ListEntry.css'

interface ListEntryProps {
  sugar: number;
  time: string;
  mood?: number;
  mealType?: number;
  comment?: string;
}

function ListEntry({sugar, time, mood = 0, mealType = 0, comment = ''}: ListEntryProps) {
  function renderMood() {
    switch (mood) {
      case 1:
        return (<span className="list-entry-mood" role="img">😫</span>)
      case 2:
        return (<span className="list-entry-mood" role="img">🙁</span>)
      case 3:
        return (<span className="list-entry-mood" role="img">😐</span>)
      case 4:
        return (<span className="list-entry-mood" role="img">🙂</span>)
      case 5:
        return (<span className="list-entry-mood" role="img">😁</span>)
      default:
        return (<span></span>)
    }
  }

  function renderMeal() {
    switch (mealType) {
      case 1: // after eating
        return (<span role="img">🍴</span>)
      case 2: // before eating
        return (<span></span>)
      case 3: // hungry
        return (<span></span>)
      case 4: // note
        return (<span role="img">🗒️</span>)
      default:
        return (<span></span>)
    }
  }

  const minSugar = 44
  const maxSugar = 72

  const [isDanger, setIsDanger] = useState(false)
  const [isBad, setIsBad] = useState(false)

  useEffect(() => {
    setIsDanger((sugar <= 30 || sugar >= 200))
    setIsBad((sugar <= minSugar || sugar >= maxSugar))
  }, [sugar])

  return (
    <div className="list-entry">
      <div className="list-entry-req">
        <span className={"list-entry-sugar-before" + (isDanger? " danger" : "")}>{isDanger? "!" : ""}</span>
        <div className={"list-entry-sugar" + (isBad? " bad" : "")}>
          {sugar / 10} <small>ммоль/Л.</small>
        </div>
        {mood !== 0 && renderMood()
        }
        <div className="list-entry-time">
          {time}
        </div>
      </div>
      {mealType !== 0 &&
          <div className="list-entry-opt">{renderMeal()}</div>
      }
      {comment !== '' &&
          <div className="list-entry-opt">{comment}</div>
      }
    </div>
  );
}

export default ListEntry;