import React from "react";
import ReactDOM from "react-dom";
import LogoutBttn from "./LogoutBttn";

test("Login renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LogoutBttn setLicit={jest.fn()} />, div);
});
