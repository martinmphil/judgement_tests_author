import React from "react";
import ReactDOM from "react-dom";
import Progress from "./Progress";

test("Outro renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Progress examLength={9} questionNumber={10} />, div);
});
