import React from "react";
import ReactDOM from "react-dom";
import Login from "./Login";

test("Login renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Login loginUrl={"string"} setLicit={jest.fn} setAuthorization={jest.fn} />,
    div
  );
});
