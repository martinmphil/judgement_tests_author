import React, { useState } from "react";

const Assessor: React.FC = () => {
  const [examNbr, setExamNbr] = useState(0);

  const submitExamNbr = () => {
    alert("you submitted and exam number");
  };

  const examNbrChange = () => {
    alert(examNbr);
  };

  return (
    <div className="App">
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
    </div>
  );
};

export default Assessor;
