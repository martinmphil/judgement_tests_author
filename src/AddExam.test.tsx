import React from "react";
import ReactDOM from "react-dom";
import AddExam from "./AddExam";

test("Assess renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddExam authorization={"string"} />, div);
});
