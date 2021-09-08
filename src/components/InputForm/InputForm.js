import React, { useState } from "react";

import Card from "../UI/Card";
import classes from "./InputForm.module.css";

const InputForm = (props) => {
  const currentDate = () => {
    let today = new Date().toISOString().slice(0, 10);
    let from= new Date(Date.now() - 9 * 24 * 60 * 60 * 1000)
    console.log(today);
    console.log(from);
    return today;
  };
  const lastTenDaysDateRange = () => {
    
    let from= new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    
    console.log(from);
    return from;
  };
  const [enteredFromDate, setEnteredFormDate] = useState(lastTenDaysDateRange);
  const [enteredToDate, setEnteredToDate] = useState(currentDate);
  const [toDateTouched, setToDateTouched] = useState(false);
  const [enteredFromDateValid, setEnteredFromDateValid] = useState(true);

  const dateFromChangeHandler = (event) => {
    setEnteredFormDate(event.target.value);
  };
  const dateToChangeHandler = (event) => {
    setEnteredToDate(event.target.value);

    setEnteredFromDateValid(true);
    setToDateTouched(true)
  };
  const formDateTouched = () => {
    setToDateTouched(true);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (!enteredToDate || !toDateTouched) {
      setEnteredFromDateValid(false);
      return;
    }
    const data = {
      from: enteredFromDate,
      to: enteredToDate,
    };
    props.onConfirm(data);
  };
  return (
    <Card className={classes.inputdata}>
      <form onSubmit={submitHandler}>
        <div className={classes.inputform__controls}>
          <div className={classes.inputform__control}>
            <label>From</label>
            <input
              type="date"
              max="2022-12-31"
              value={enteredFromDate}
              onChange={dateFromChangeHandler}
            />
          </div>
          <div className={classes.inputform__control}>
            <label>To</label>
            <input
              type="date"
              min={enteredFromDate}
              max="2022-12-31"
              value={enteredToDate}
              onChange={dateToChangeHandler}
              onBlur={formDateTouched}
            />
            {!enteredFromDateValid && <p>Please select a date.</p>}
          </div>
        </div>
        <div className={classes.inputform__actions}>
          <button type="submit">Render</button>
        </div>
      </form>
    </Card>
  );
};

export default InputForm;
