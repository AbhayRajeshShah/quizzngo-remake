import { useState } from "react";
import "./question.css";

const Question = ({ save, no }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  // update question value on Change
  const questionChange = (e) => {
    setQuestion(e.target.value);
  };

  //add option
  const addOption = () => {
    setOptions((opt) => [...opt, ""]);
  };

  //update options array onChange
  const triggerChange = (e, key) => {
    let { value } = e.target;
    let temp = [];
    options.forEach((option) => {
      temp.push(option);
    });
    temp[key] = value;
    setOptions(temp);
  };

  return (
    <>
      <div className="questionBody">
        <p className="no">{no + 1}</p>
        <textarea
          className="question"
          placeholder="Type out your Question Here"
          value={question}
          onChange={questionChange}
        ></textarea>
        <div className="options">
          {options.map((option, key) => {
            return (
              <input
                className={key === 0 ? "correct" : "option"}
                key={key}
                placeholder={key === 0 ? "Correct Option" : "Add Other Options"}
                value={option}
                onChange={(e) => {
                  triggerChange(e, key);
                }}
              ></input>
            );
          })}

          <button onClick={addOption}>+</button>
        </div>
        <button
          className="save"
          onClick={() => {
            save(question, options);
            setQuestion("");
            setOptions(["", ""]);
          }}
        >
          <i className="fa-solid fa-floppy-disk"></i>
        </button>
      </div>
    </>
  );
};

export default Question;
