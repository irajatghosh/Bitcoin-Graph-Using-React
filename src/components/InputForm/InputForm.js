import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import classes from "./InputForm.module.css";

const InputForm = (props) => {
  const currentDate = () => {
    let today = new Date().toISOString().slice(0, 10);
    return today;
  };
  const lastTenDaysDateRange = () => {
    let from = new Date(Date.now() - 9 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    return from;
  };
  const [initialFromDate] = useState(lastTenDaysDateRange);
  const [initialToDate] = useState(currentDate);
  const [enteredFromDate, setEnteredFormDate] = useState(lastTenDaysDateRange);
  const [enteredToDate, setEnteredToDate] = useState(currentDate);
  const [validDate, setValidDate] = useState(true);

  const { onConfirm } = props;
  const dateFromChangeHandler = (event) => {
    //   setFormDate(event.target.value)
    setEnteredFormDate(event.target.value);
  };
  const dateToChangeHandler = (event) => {
    //   setToFormDate(event.target.value)
    setEnteredToDate(event.target.value);
  };

  useEffect(() => {
    const data = {
      from: initialFromDate,
      to: initialToDate,
    };
    onConfirm(data);
  }, []);
  const submitHandler = (event) => {
    event.preventDefault();

    const fromDate = new Date(enteredFromDate);
    const toDate = new Date(enteredToDate);
    if (fromDate > toDate) {
      setValidDate(false);
      return;
    }
    setValidDate(true);
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
              min={initialFromDate}
              max={initialToDate}
              value={enteredFromDate}
              onChange={dateFromChangeHandler}
            />
          </div>
          <div className={classes.inputform__control}>
            <label>To</label>
            <input
              type="date"
              value={enteredToDate}
              max={initialToDate}
              min={initialFromDate}
              onChange={dateToChangeHandler}
            />
            {!validDate && (
              <p>
                Please select a valid date. To date can't be before From date!
              </p>
            )}
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
