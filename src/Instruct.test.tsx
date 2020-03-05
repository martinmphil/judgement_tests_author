import React from "react";
import ReactDOM from "react-dom";
import Instruct from "./Instruct";

test("Outro renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Instruct />, div);
});
