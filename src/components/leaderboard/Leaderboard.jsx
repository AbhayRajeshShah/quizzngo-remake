import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "../../firebase";
import "./leaderboard.css";

const Leaderboard = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [found, setFound] = useState(false);

  function compare(a, b) {
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    db.collection("quizzes").onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id === id) {
          setUsers(doc.data().users);
          setFound(true);
        }
      });
    });
  }, []);

  if (found) {
    return (
      <div className="leaderboard">
        <h1 className="leaderboard-title">Leaderboard</h1>
        {users.sort(compare).map((el, key) => {
          return (
            <div key={key} className="place">
              <p>{el.score}</p>
              <p>{el.name}</p>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <p>Loading or quiz not found</p>;
  }
};

export default Leaderboard;
