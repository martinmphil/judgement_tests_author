import React, { useState } from "react";
import { backend } from "./ConfigAssessor";
import ExamPicker from "./ExamPicker";

interface Props {
  authorization: string;
}

const Assessor: React.FC<Props> = props => {
  const [examId, setExamId] = useState(0);

  return (
    <main>
      <h1>Invite</h1>
      <ExamPicker setExamId={setExamId} authorization={props.authorization} />
      <hr />

      {/* TO RMEOVE */}
      <p>Current exam is {examId}</p>
      <p>Base url is {backend} </p>
    </main>
  );
};

export default Assessor;
