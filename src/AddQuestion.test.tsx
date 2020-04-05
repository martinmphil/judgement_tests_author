import React from "react";
import ReactDOM from "react-dom";
import AddQuestion from "./AddQuestion";

test("Assess renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddQuestion authorization={"string"} />, div);
});
