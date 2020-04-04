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
  const [questionIndex, setQuestionIndex] = useState(0);

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
          if (data) {
            setExamData(data);
          }
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

  const QuestionPicker = () => {
    return (
      <form>
        <fieldset>
          <legend>Pick a question</legend>
          {examData.scenarios.map((scenario, index) => (
            <label
              key={scenario.situation + index}
              htmlFor={scenario.situation + index}
              className="edit-question-picker-input-label"
            >
              <input
                key={scenario.situation + index}
                type="radio"
                id={scenario.situation + index}
                name="question"
                checked={questionIndex === index}
                onChange={e => setQuestionIndex(index)}
                value={index}
              ></input>
              Question nbr {index + 1} |
            </label>
          ))}
        </fieldset>
      </form>
    );
  };

  const ExamText = () => {
    return (
      <section>
        <h1>{examData.title}</h1>
        <h2>Exam number {examData.examNumber}</h2>
        <QuestionPicker />
      </section>
    );
  };

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
      <p>Edit q index {questionIndex}</p>
      {/* TO REMOVE */}

      {examData.examNumber > 0 ? <ExamText /> : ""}
    </main>
  );
};

export default Edit;
