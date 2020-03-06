import React, { useState } from "react";
import "./App.css";
import Assessor from "./Assessor";
import Author from "./Author";

const App: React.FC = () => {
  return (
    <div className="App">
      <Assessor />
      <Author />
    </div>
  );
};

export default App;
