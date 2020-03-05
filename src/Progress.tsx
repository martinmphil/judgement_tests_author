import React from "react";

interface Props {
  questionNumber: number;
  examLength: number;
}

const Progress: React.FC<Props> = props => {
  return (
    <div className="exam-progress-bar">
      <label htmlFor="examProgressBar">Progress:- </label>
      <progress
        id="examProgressBar"
        max={props.examLength}
        value={props.questionNumber}
      ></progress>
    </div>
  );
};

export default Progress;
