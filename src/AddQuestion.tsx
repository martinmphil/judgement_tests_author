import React, { useState } from "react";
import "./AddQuestion.css";
import { backend } from "./ConfigAssessor";

interface Props {
  authorization: string;
}

const AddQuestion: React.FC<Props> = (props) => {
  const [examId, setExamId] = useState(0);

  // TO REMOVE
  const handler = () => {
    setExamId(-1);
  };

  return (
    <main>
      <h1>Add Question</h1>
      <p>
        Add question {examId} {backend}
      </p>
      <button onClick={handler}>TO RMEOVE</button>
    </main>
  );
};

export default AddQuestion;
