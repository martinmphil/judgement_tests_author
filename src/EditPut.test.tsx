import React from "react";
import ReactDOM from "react-dom";
import EditPut from "./EditPut";

test("Login renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <EditPut
      questionIndex={0}
      situation={"situation"}
      judgements={["", "", "", ""]}
      idealBest={0}
      idealWorst={3}
      setIdealBest={jest.fn}
      setIdealWorst={jest.fn}
    />,
    div
  );
});
