import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import db from "../../firebase";
import Question from "./Question";

const Quiz = () => {
  const { id } = useParams();
  const [quiz, setquiz] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [no, setNo] = useState(0);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);
  const [done, setDone] = useState(false);
  const [found, setFound] = useState(false);

  const check = (e) => {
    if (quiz.questions[no].correctAns === e.target.innerText) {
      let scores = score + Math.round(time * 16.666);
      setScore(scores);
      if (quiz.questions.length - 1 > no) {
        let n = no;
        n++;
        clearTimeout(timeout);
        setNo(n);
        setTime(60);
      }
      if (quiz.questions.length - 1 === no) {
        let temp = players;
        temp[temp.length - 1].score = scores;
        db.collection("quizzes")
          .doc(id)
          .update({ users: temp })
          .then(() => {
            setDone(true);
          });
      }
    }
  };

  const userInput = () => {
    let temp = false;
    quiz.users.forEach((el) => {
      if (el.name === name) {
        temp = true;
      }
    });
    if (temp === false) {
      let users = [];
      quiz.users.forEach((el) => {
        users.push(el);
      });
      users.push({ name: name, score: 0 });
      setPlayers(users);
      db.collection("quizzes").doc(id).update({ users: users });
      setLoaded(true);
      setTime(60);
    } else {
      alert("User already Exists");
    }
  };

  useEffect(() => {
    db.collection("quizzes").onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id === id) {
          setquiz({
            id: id,
            questions: doc.data().questions,
            users: doc.data().users,
          });
          setFound(true);
        }
      });
    });
  }, []);
  var timeout;
  useEffect(() => {
    if (time > 0) {
      let temp = time;
      temp--;
      timeout = setTimeout(() => {
        setTime(temp);
      }, 1000);
    }
  }, [time]);
  if (found) {
    if (done) {
      return (
        <div className="leaderboard-popup">
          <p className="greet">Congratulations !</p>
          <p className="final-score">Your Score : {score}</p>
          <button>
            <Link to={`/leaderboard/${id}`}>Leaderboard </Link>
          </button>
        </div>
      );
    } else {
      if (loaded) {
        let question = quiz.questions[no].question;

        return (
          <>
            <div className="quiz">
              <p className="time">{time}</p>
              <p className="score">{score}</p>
              <Question
                question={question}
                options={quiz.questions[no].options}
                onClick={check}
              />
            </div>
          </>
        );
      } else {
        return (
          <div className="submitted">
            <p>Enter Your Name</p>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter Your Name"
            ></input>
            <button className="user " onClick={userInput}>
              asd
            </button>
          </div>
        );
      }
    }
  } else {
    return <p>If this shows for more than 5s your quiz is not found</p>;
  }
};

export default Quiz;
