import React, {useEffect, useState} from "react";
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import SlideRule from 'react-slide-rule';

import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";

function Measure({
  mainButton,
  measures, setMeasures
                 }) {
  const [sugarVal, setSugarVal] = useState(5)
  const [meal, setMeal] = useState(0)
  const [mood, setMood] = useState(3)
  const [isComment, setIsComment] = useState(false)
  const [comment, setComment] = useState('')
  const [dateTime, setDateTime] = useState(dayjs())

  const [ref, setRef] = useState(null);
  const width = ref?.offsetWidth;

  const minSugar = 1
  const maxSugar = 40

  const handleMeal = (e) => {
    const mealId = Number(e.target.id.charAt(4))
    if (mealId == meal) {
      setMeal(0)
      return
    }
    setMeal(mealId)
  }

  const handleMood = (e) => {
    setMood(Number(e.target.id.charAt(4)))
  }

  const handleComment = (e) => {
    if (!isComment) {
      setIsComment(true)
    }

    setComment(e.target.value)
  }

  const navigate = useNavigate()

  useEffect(() => {
    const addMeasure = () => {
      const year = (dateTime.year() - 2000).toString()
      const month = (dateTime.month() + 1).toString()
      const day = dateTime.date() < 10 ? '0' + dateTime.date() : (dateTime.date()).toString()

      const hour = dateTime.hour().toString()
      const minute = dateTime.minute().toString()

      console.log({year, month, day, hour, minute})

      const newId = measures[measures.length - 1].id + 1

      const newMeasure = {
        id: newId,
        sugar: Number(sugarVal.toFixed(2)) * 10,
        date: day + month + year,
        day: day,
        month: month,
        year: year,
        time: hour + ':' + minute,
        mood: mood,
        mealType: meal,
        comment: isComment ? '' : comment
      }

      setMeasures([...measures, newMeasure])
      navigate('/')
    }

    mainButton.setText("+")
    mainButton.enable().show()

    mainButton.on(addMeasure)
  }, [comment, dateTime, isComment, mainButton, meal, measures, mood, setMeasures, sugarVal, navigate])

  return (
    <>
      <div className="measure-datetime">
        <MobileDateTimePicker
          value={dateTime}
          onChange={(date) => setDateTime(date)}
        />
      </div>
      <div className="measure">
        <div>
          <button></button>
          <span>{sugarVal}</span>
          <button></button>
        </div>
        <div ref={setRef} className="sugar-input">
          <SlideRule
            value={sugarVal}
            onChange={(v) => setSugarVal(v)}
            step={0.1}
            min={minSugar}
            max={maxSugar}
            gap={5}
            width={width}
          />
        </div>
        <div className="measure-meal">
          <button
            id="meal1" onClick={handleMeal}
            className={"measure-meal" + (meal == 1 ? " active" : "")}
          >
            Before
          </button>
          <button
            id="meal2" onClick={handleMeal}
            className={"measure-meal" + (meal == 2 ? " active" : "")}
          >
            After
          </button>
        </div>
      </div>
      <div className="measure">
        <div className="measure-mood">
          <span
            id="mood1" onClick={handleMood} role="img"
            className={"measure-mood" + (mood == 1 ? " active" : '')}
          >
            😫
          </span>
          <span
            id="mood2" onClick={handleMood} role="img"
            className={"measure-mood" + (mood == 2 ? " active" : '')}
          >
            🙁
          </span>
          <span
            id="mood3" onClick={handleMood} role="img"
            className={"measure-mood" + (mood == 3 ? " active" : '')}
          >
            😐
          </span>
          <span
            id="mood4" onClick={handleMood} role="img"
            className={"measure-mood" + (mood == 4 ? " active" : "")}
          >
            🙂
          </span>
          <span
            id="mood5" onClick={handleMood} role="img"
            className={"measure-mood" + (mood == 5 ? " active" : "")}
          >
            😁
          </span>
        </div>
      </div>
      <div className="measure">
        <div className="measure-comment">
          <input
            type="checkbox" className={"measure-switch" + (isComment ? " active" : "")}
            onClick={() => setIsComment(!isComment)}
          />
          <textarea value={comment} onChange={handleComment}></textarea>
        </div>
      </div>
    </>
  );
}

export default Measure;