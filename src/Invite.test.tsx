import React from "react";
import ReactDOM from "react-dom";
import Invite from "./Invite";

test("Assessor renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Invite />, div);
});
