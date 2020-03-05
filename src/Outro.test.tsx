import React from "react";
import ReactDOM from "react-dom";
import Outro from "./Outro";

test("Outro renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Outro />, div);
});
