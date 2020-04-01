import React, { useState, useEffect } from "react";
import { backend } from "./ConfigAssessor";

interface Props {
  authorization: string;
  setExamId: (x: number) => void;
}

const ExamPicker: React.FC<Props> = props => {
  const [loading, setLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);
  const [examList, setExamList] = useState([{ examNumber: 0, examTitle: "" }]);
  const [examPicked, setExamPicked] = useState(1);

  useEffect(() => {
    fetch(`${backend}exams/summary`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: props.authorization
      }
    })
      .then(response => {
        setLoading(false);
        if (!response.ok) {
          setErrorLoading(true);
        } else {
          return response.json();
        }
      })
      .then(data => {
        setExamList(data);
      })
      .catch(error => {
        setErrorLoading(true);
        setLoading(false);
        console.error("Error:", error);
      });
  }, [props.authorization]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    props.setExamId(examPicked);
  };

  const labelStyle = { display: "inline-block" };

  const ExamList = () => {
    if (examList) {
      return (
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Please pick an exam</legend>
            {examList.map((x, i) => (
              <label
                key={x.examNumber.toString()}
                htmlFor={x.examNumber.toString()}
                style={labelStyle}
              >
                <input
                  key={x.examNumber.toString()}
                  type="radio"
                  id={x.examNumber.toString()}
                  name="exam"
                  checked={examPicked === i + 1}
                  onChange={e => setExamPicked(parseInt(e.target.value))}
                  value={x.examNumber}
                ></input>
                {x.examNumber} - {x.examTitle} |
              </label>
            ))}
            <div>
              <button type="submit">Submit</button>
              <span>Exam number:- {examPicked}</span>
            </div>
          </fieldset>
        </form>
      );
    } else return <span></span>;
  };

  return (
    <section>
      {loading && <p>Loading...</p>}
      {errorLoading && (
        <p className="error-warning">
          Sorry we experienced an error loading your exams list. Please try
          again later.
        </p>
      )}
      {!loading && <ExamList />}
      <hr />
    </section>
  );
};

export default ExamPicker;
