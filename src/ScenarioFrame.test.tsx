import React from "react";
import ReactDOM from "react-dom";
import ScenarioFrame from "./ScenarioFrame";

test("Login renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <ScenarioFrame
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
