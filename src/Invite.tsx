import React, { useState, useEffect } from "react";
import { backend } from "./ConfigAssessor";
import ExamPicker from "./ExamPicker";

interface Props {
  authorization: string;
}

const Assessor: React.FC<Props> = props => {
  const [examId, setExamId] = useState(0);
  const [examIsPicked, setExamIsPicked] = useState(false);

  useEffect(() => {
    if (examId > 0) {
      setExamIsPicked(true);
    }
  }, [examId]);

  const Invitees = () => {
    return (
      <form>
        <h2>Exam number {examId}</h2>
        <fieldset>
          <legend>Please enter invitees</legend>
          <textarea name="invitees" id="invitee"></textarea>
        </fieldset>
      </form>
    );
  };

  return (
    <main>
      <h1>Invite</h1>
      <ExamPicker setExamId={setExamId} authorization={props.authorization} />
      <hr />

      {/* TO RMEOVE */}
      <p>Current exam is {examId}</p>
      <p>Base url is {backend} </p>
      <hr />
      {/* TO RMEOVE */}

      {examIsPicked && <Invitees />}
    </main>
  );
};

export default Assessor;
