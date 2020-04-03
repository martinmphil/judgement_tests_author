import React from "react";
import ReactDOM from "react-dom";
import Author from "./Author";

test("Author renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Author authorization={"string"} />, div);
});
