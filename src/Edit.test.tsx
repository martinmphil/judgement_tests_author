import React from "react";
import ReactDOM from "react-dom";
import Edit from "./Edit";

test("Assess renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Edit authorization={"string"} />, div);
});
