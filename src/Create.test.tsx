import React from "react";
import ReactDOM from "react-dom";
import Create from "./Create";

test("Assess renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Create authorization={"string"} />, div);
});
