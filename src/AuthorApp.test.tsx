import React from "react";
import App from "./AuthorApp";
import ReactDOM from "react-dom";

test("App renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});
