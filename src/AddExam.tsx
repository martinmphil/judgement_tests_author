import React, { useState } from "react";
import "./AddExam.css";
import { backend } from "./ConfigAssessor";

interface Props {
  authorization: string;
}

const AddExam: React.FC<Props> = (props) => {
  const [examId, setExamId] = useState(0);

  // TO REMOVE
  const handler = () => {
    setExamId(-1);
  };

  return (
    <main>
      <p>
        Add Exam {examId} {backend}
      </p>
      <p>
        Please go to add question (link) and pick your exam number 1 titled
        "exam title" (returned exam number and title
      </p>
      <button onClick={handler}>TO RMEOVE</button>
    </main>
  );
};

export default AddExam;
