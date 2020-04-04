import React from "react";
import ReactDOM from "react-dom";
import QuestionPicker from "./AddExam";

test("Assess renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<QuestionPicker authorization={"string"} />, div);
});
