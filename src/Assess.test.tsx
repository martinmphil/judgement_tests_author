import React from "react";
import Assess from "./Assess";
import ReactDOM from "react-dom";

test("Assess renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Assess />, div);
});
