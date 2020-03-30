import React from "react";
import ReactDOM from "react-dom";
import Logout from "./Logout";

test("Login renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Logout setLicit={jest.fn()} />, div);
});
