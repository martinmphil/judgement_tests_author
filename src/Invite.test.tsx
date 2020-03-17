import React from "react";
import Invite from "./Invite";
import ReactDOM from "react-dom";

test("Assessor renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Invite />, div);
});
