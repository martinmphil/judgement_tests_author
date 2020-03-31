import React, { useState } from "react";

const Assessor: React.FC = () => {
  // NB chahge to set examId
  const [examNbr, setExamNbr] = useState(0);

  const submitExamNbr = () => {
    alert("you submitted and exam number");
  };

  const examNbrChange = () => {
    alert(examNbr);
    setExamNbr(0);
  };

  return (
    <main>
      <h1>Invite</h1>
      {/* react controlled component */}
      <form onSubmit={submitExamNbr}>
        <label htmlFor="exam">
          Exam id nbr:
          <input
            type="number"
            className="exam-number-input"
            id="exam"
            onChange={examNbrChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </main>
  );
};

export default Assessor;
