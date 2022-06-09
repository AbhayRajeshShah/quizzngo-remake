import Question from "./Question";
import { useState } from "react";
import { Link } from "react-router-dom";
import db from "../../firebase";

const Create = () => {
  const [questions, setQuestions] = useState([
    { question: "", options: ["", ""] },
  ]);
  const [added, setAdded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quizId, setQuizId] = useState("");
  const [no, setNo] = useState(0);

  //save the current question stats
  const save = (q, o) => {
    //check for question and option empty fields
    if (q === "") {
      alert("Question Field is Empty");
      return;
    }
    let exit = false;
    o.forEach((el) => {
      if (el === "") {
        alert("Option Field Empty");
        exit = true;
      }
    });
    if (exit) {
      return;
    }

    //duplicate questions array to mutate
    let temp = [];
    questions.forEach((el) => {
      temp.push(el);
    });
    temp[no].question = q;
    temp[no].options = o;
    temp.push({ question: "", options: [""] });
    setQuestions(temp);

    //increase Question No
    let n = no + 1;
    setNo(n);

    //popup to confirm addition
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 650);
  };

  const submit = () => {
    if (no === 0) {
      alert("Please Add Some Questions");
      return;
    }
    //remove last array item from questions
    let temp = [];
    for (let i = 0; i < questions.length - 1; i++) {
      let correctAns = questions[i].options[0];
      let shuffleoptions = questions[i].options.sort(() => Math.random() - 0.5);
      temp.push({
        question: questions[i].question,
        options: shuffleoptions,
        correctAns: correctAns,
      });
    }

    //add quiz to db
    db.collection("quizzes")
      .add({ questions: temp, users: [] })
      .then((doc) => {
        setQuizId(doc.id);
        setSubmitted(true);
      });
  };

  return (
    <>
      <div
        className="submitted"
        style={{ display: submitted ? "block" : "none" }}
      >
        <p>Congratulations !</p>
        <Link to={`/quiz/${quizId}`}>
          <button>Link To Quiz</button>
        </Link>
      </div>

      <div className="added" style={{ display: added ? "block" : "none" }}>
        Added <i className="fa-solid fa-check"></i>
      </div>
      <div style={{ display: submitted ? "none" : "block" }}>
        <Question save={save} no={no} />
        <button className="submit" onClick={submit}>
          Add Quiz
        </button>
      </div>
    </>
  );
};

export default Create;
