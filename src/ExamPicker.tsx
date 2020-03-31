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
        console.log(data);
      });

    // REMOVE
    console.log("loading");
  }, []);

  const ExamList = () => {
    return <article>{examList.map(x => x.examTitle)}</article>;
  };

  return (
    <section>
      <p>Pick an exam</p>
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
