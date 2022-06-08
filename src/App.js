import Navbar from "./components/Navbar";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="intro">
        <div>
          <h1>Create Amazing Yet Simple Looking Quizzes with Ease !</h1>
          <Link to={"/create"}>
            <button className="nav-btn">Create</button>
          </Link>
        </div>
        <img
          className="img"
          src={process.env.PUBLIC_URL + "/images/graphic.png"}
          alt="graphic"
        />
      </div>
    </div>
  );
}

export default App;
