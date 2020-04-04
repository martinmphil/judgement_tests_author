import React from "react";
import ReactDOM from "react-dom";
import QuestionPicker from "./QuestionPicker";

test("Assess renders without crashing", () => {
  const div = document.createElement("div");
  const scenarios = [
    {
      situation: "string",
      judgements: ["j0", "j1", "j2", "j3"],
    },
  ];
  ReactDOM.render(
    <QuestionPicker
      scenarios={scenarios}
      questionIndex={0}
      setQuestionIndex={jest.fn}
    />,
    div
  );
});
