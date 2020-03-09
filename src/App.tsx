import React, { useState } from "react";
import "./App.css";
import Assessor from "./Assessor";
import Author from "./Author";
import Login from "./Login";

const App: React.FC = () => {
  const [licit, setLicit] = useState(false);

  return <div className="App">{licit ? <Assessor /> : <Login />}</div>;
};

export default App;
