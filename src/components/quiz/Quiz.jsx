import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import db from "../../firebase";
import Question from "./Question";

const Quiz = () => {
  const { id } = useParams();
  //store quiz object
  const [quiz, setquiz] = useState({});
  //start game
  const [loaded, setLoaded] = useState(false);
  //Current Question No
  const [no, setNo] = useState(0);
  //Time left in Question
  const [time, setTime] = useState(0);
  //Score
  const [score, setScore] = useState(0);
  //User Name
  const [name, setName] = useState("");
  //All users
  const [players, setPlayers] = useState([]);
  //Check if quiz is completed
  const [done, setDone] = useState(false);
  //Check if params id is valid
  const [found, setFound] = useState(false);

  const check = (e) => {
    //check if correctAns
    if (quiz.questions[no].correctAns === e.target.innerText) {
      //Add score and update value
      let scores = score + Math.round(time * 16.666);
      setScore(scores);

      //check if its the last question if not display next Q
      if (quiz.questions.length - 1 > no) {
        let n = no;
        n++;
        clearTimeout(timeout);
        setNo(n);
        setTime(60);
      }
      //if current Q is last Q update db with user score
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
    //check if same user exists
    let temp = false;
    quiz.users.forEach((el) => {
      if (el.name === name) {
        temp = true;
      }
    });

    //if new user update db to hold name
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

  //onLoad of page get db data
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

  //declare variable to mutate when going to next Q
  var timeout;

  //timer tick tock
  useEffect(() => {
    if (time > 0) {
      let temp = time;
      temp--;
      timeout = setTimeout(() => {
        setTime(temp);
      }, 1000);
    }
  }, [time]);

  //render based on conditions
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
              proceed
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
