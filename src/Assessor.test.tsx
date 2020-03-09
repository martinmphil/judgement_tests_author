import React from "react";
import Assessor from "./Assessor";
import ReactDOM from "react-dom";

test("Assessor renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Assessor />, div);
});
