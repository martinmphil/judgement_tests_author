import React from "react";

interface Props {
  candidateName: string;
}

const Instruct: React.FC<Props> = props => {
  return (
    <header>
      <h1>Instructions</h1>
      <p>
        <em>{props.candidateName}</em>, please select one of the buttons on the
        left to pick your "best" (most effective) response, AND select one of
        the buttons on the right to pick your "worst" (least effective)
        response.
      </p>
      <p>
        Pressing the same Best or Worst button a second time deselects your
        answer and resets your choices.
      </p>
      <p>
        After selecting your answers, press the "submit" button to submit your{" "}
        <em>final</em> answer.
      </p>
    </header>
  );
};

export default Instruct;
