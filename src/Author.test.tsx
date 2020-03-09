import React from "react";
import Author from "./Author";
import ReactDOM from "react-dom";

test("Author renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Author />, div);
});
