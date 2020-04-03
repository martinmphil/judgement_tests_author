import React, { useState } from "react";
import "./Create.css";
import { backend } from "./ConfigAssessor";
import ExamPicker from "./ExamPicker";

interface Props {
  authorization: string;
}

const Edit: React.FC<Props> = props => {
  const [examId, setExamId] = useState(0);
  return (
    <main>
      <ExamPicker setExamId={setExamId} authorization={props.authorization} />
      <p>
        Edit {examId} {backend}
      </p>
    </main>
  );
};

export default Edit;
