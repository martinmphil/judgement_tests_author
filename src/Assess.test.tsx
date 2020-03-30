import React from "react";
import ReactDOM from "react-dom";
import Assess from "./Assess";

test("Assess renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Assess />, div);
});
