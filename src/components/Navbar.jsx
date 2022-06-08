import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <p className="title">QuizznGo</p>

        <Link to={"/create"}>
          <button className="nav-btn">Create</button>
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
