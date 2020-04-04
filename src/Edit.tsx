import React, { useState, useEffect } from "react";
import "./Create.css";
import { backend } from "./ConfigAssessor";
import ExamPicker from "./ExamPicker";

interface Props {
  authorization: string;
}

interface IExamData {
  examNumber: number;
  title: string;
  intro: string;
  outro: string;
  scenarios: IScenarios[];
}

interface IScenarios {
  situation: string;
  judgements: string[];
}

const Edit: React.FC<Props> = props => {
  const [examId, setExamId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorLoadingExam, setErrorLoadingExam] = useState(false);
  const [examData, setExamData] = useState<IExamData>({
    examNumber: 0,
    title: "",
    intro: "",
    outro: "",
    scenarios: [
      {
        situation: "",
        judgements: ["", "", "", ""]
      }
    ]
  });

  useEffect(() => {
    const fetchExam = (pickedExam: number) => {
      return fetch(`${backend}exams/${pickedExam}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: props.authorization
        }
      })
        .then(response => {
          setLoading(false);
          if (!response.ok) {
            setErrorLoadingExam(true);
          } else {
            return response.json();
          }
        })
        .then(data => {
          setExamData(data);
          // return data;
        })
        .catch(error => {
          setErrorLoadingExam(true);
          console.error("Error:", error);
        });
    };

    if (examId > 0) {
      fetchExam(examId);
    }
  }, [examId, props.authorization]);

  return (
    <main>
      <ExamPicker setExamId={setExamId} authorization={props.authorization} />

      {loading && <p>Loading...</p>}

      {errorLoadingExam && (
        <p className="error-warning">
          Sorry we experienced an error loading exam number "{examId}". Please
          try again later.
        </p>
      )}

      {/* TO REMOVE */}
      <p>Edit {examData.title}</p>
      {/* TO REMOVE */}
    </main>
  );
};

export default Edit;
