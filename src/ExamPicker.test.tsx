import React from "react";
import ReactDOM from "react-dom";
import ExamPicker from "./ExamPicker";

test("Assess renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <ExamPicker authorization={"string"} setExamId={jest.fn} />,
    div
  );
});
