import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Create from "./components/create/Create";
import Quiz from "./components/quiz/Quiz";
import Leaderboard from "./components/leaderboard/Leaderboard";
import { HashRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Routes>
      <Route path="" element={<App />}></Route>
      <Route path="/create" element={<Create />}></Route>
      <Route path="/quiz">
        <Route path=":id" element={<Quiz />}></Route>
      </Route>
      <Route path="/leaderboard">
        <Route path=":id" element={<Leaderboard />}></Route>
      </Route>
    </Routes>
  </HashRouter>
);
