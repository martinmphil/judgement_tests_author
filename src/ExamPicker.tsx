import React, { useState, useEffect } from "react";
import { backend } from "./ConfigAssessor";

interface Props {
  authorization: string;
  backend: string;
  setExamId: (x: number) => void;
}

const ExamPicker: React.FC<Props> = props => {
  const [loading, setLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);
  const [examList, setExamList] = useState([{ examNumber: 0, examTitle: "" }]);

  useEffect(() => {
    fetch(`${backend}exams/summary`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: props.authorization
      }
    })
      .then(response => {
        if (!response.ok) {
          setErrorLoading(true);
        } else {
          setLoading(false);
          return response.json();
        }
      })
      .then(data => {
        setExamList(data);
        //
        //
        // NB REMOVE
        console.log(data);
      });
  }, [props.authorization]);

  const labelStyle = { display: "inline-block" };

  const ExamList = () => {
    return (
      <form>
        {examList.map((x, i) => (
          <label
            key={x.examNumber.toString()}
            htmlFor={x.examNumber.toString()}
            style={labelStyle}
          >
            <input
              type="radio"
              id={x.examNumber.toString()}
              name="exam"
              defaultChecked={i === 0 ? true : false}
              value={x.examNumber}
            ></input>
            {x.examNumber} - {x.examTitle} |
          </label>
        ))}
      </form>
    );
  };

  return (
    <section>
      <p>Please pick an exam from the following list.</p>
      {loading && <p>Loading...</p>}
      {errorLoading && (
        <p>
          Sorry we experienced an error loading you list of exams, please try
          again later.
        </p>
      )}
      {!loading && <ExamList />}
      <hr />
    </section>
  );
};

export default ExamPicker;
