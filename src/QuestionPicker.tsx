import React from "react";
import "./QuestionPicker.css";

interface Props {
  setQuestionIndex: (x: number) => void;
  questionIndex: number;
  scenarios: IScenarios[];
}

interface IScenarios {
  situation: string;
  judgements: string[];
}

const QuestionPicker: React.FC<Props> = props => {
  return (
    <form>
      <fieldset>
        <legend>Pick a question</legend>
        {props.scenarios.map((scenario, index) => (
          <label
            key={scenario.situation + index}
            htmlFor={scenario.situation + index}
            className="edit-question-picker-input-label"
          >
            <input
              key={scenario.situation + index}
              type="radio"
              id={scenario.situation + index}
              name="question"
              checked={props.questionIndex === index}
              onChange={e => props.setQuestionIndex(index)}
              value={index}
            ></input>
            Question nbr {index + 1} |
          </label>
        ))}
      </fieldset>
    </form>
  );
};

export default QuestionPicker;
