import React from "react";
import { nanoid } from "nanoid";

export default function (props) {
  return (
    <div className="quiz-page">
      <h3 className="question">{props.question}</h3>
      <form action="" className="options">
        {props.options.map((el, i) => {
          const myId = Math.random();
          return (
            <>
              <input
                type="radio"
                id={el + myId}
                // name={props.id}
                name={props.id}
                value={el}
                onClick={(event) => props.saveSelectedOption(event)}
                className="option"
                // style={{
                //   backgroundColor: props.selected ? "#59e391" : "transparent",
                // }}
                // className="radio"
                // className={props.selected ? "selected" : ""}
                // checked={props.selected}
                // onChange={(event)=>props.selectedOption(event)}
              />
              <label htmlFor={el + myId} className={`label`}>
                {el}
              </label>
            </>
          );
        })}
      </form>
    </div>
  );
}
