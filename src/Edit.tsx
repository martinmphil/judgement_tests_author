import React, { useState, useEffect } from "react";
import "./Edit.css";
import { backend } from "./ConfigAssessor";
import ExamPicker from "./ExamPicker";
import QuestionPicker from "./QuestionPicker";
import EditPut from "./EditPut";

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

const Edit: React.FC<Props> = (props) => {
  const [examId, setExamId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorLoadingExam, setErrorLoadingExam] = useState(false);
  const [errorLoadingRubric, setErrorLoadingRubric] = useState(false);
  const [errorDeleting, setErrorDeleting] = useState(false);
  const [examData, setExamData] = useState<IExamData>({
    examNumber: 0,
    title: "",
    intro: "",
    outro: "",
    scenarios: [
      {
        situation: "",
        judgements: ["", "", "", ""],
      },
    ],
  });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [idealBest, setIdealBest] = useState(-1);
  const [idealWorst, setIdealWorst] = useState(-2);
  const [situation, setSituation] = useState("");
  const [judgements, setJudgements] = useState([""]);

  useEffect(() => {
    if (examId > 0) {
      const fetchRubric = (pickedExam: number) => {
        return fetch(`${backend}exams/${pickedExam}/rubric`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: props.authorization,
          },
        })
          .then((response) => {
            if (!response.ok) {
              setErrorLoadingRubric(true);
            } else {
              return response.json();
            }
          })
          .then((data) => {
            return data;
          })
          .catch((error) => {
            setErrorLoadingRubric(true);
            console.error("Error:", error);
          });
      };

      const fetchExam = (pickedExam: number) => {
        return fetch(`${backend}exams/${pickedExam}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: props.authorization,
          },
        })
          .then((response) => {
            if (!response.ok) {
              setErrorLoadingExam(true);
            } else {
              return response.json();
            }
          })
          .then((data) => {
            return data;
          })
          .catch((error) => {
            setErrorLoadingExam(true);
            console.error("Error:", error);
          });
      };

      Promise.all([fetchRubric(examId), fetchExam(examId)])
        .then((fetchedData) => {
          if (fetchedData[0]) {
            setIdealBest(fetchedData[0][questionIndex].best);
            setIdealWorst(fetchedData[0][questionIndex].worst);
          }
          if (fetchedData[1]) {
            setExamData(fetchedData[1]);
            setSituation(fetchedData[1].scenarios[questionIndex].situation);
            setJudgements(fetchedData[1].scenarios[questionIndex].judgements);
          }

          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error(error.message);
        });
    }
  }, [examId, props.authorization, questionIndex]);

  const deleting = () => {
    fetch(`${backend}exams/${examId}/scenario/${questionIndex}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: props.authorization,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setErrorDeleting(true);
        } else {
          window.location.reload();
        }
      })
      .catch((error) => {
        setErrorDeleting(true);
        console.error("Error:", error);
      });
  };

  const QuestionSection = () => {
    return (
      <section>
        <h2>Exam title: {examData.title}</h2>
        <h3>Exam number: {examData.examNumber}</h3>
        <QuestionPicker
          scenarios={examData.scenarios}
          questionIndex={questionIndex}
          setQuestionIndex={setQuestionIndex}
        />
        {questionIndex === examData.scenarios.length - 1 && (
          <button onClick={deleting} className="delete-question-button">
            Delete entire question
          </button>
        )}
        <EditPut
          authorization={props.authorization}
          examId={examId}
          questionIndex={questionIndex}
          situation={situation}
          judgements={judgements}
          idealBest={idealBest}
          idealWorst={idealWorst}
        />
      </section>
    );
  };

  return (
    <main>
      <h1>Edit Question</h1>

      <ExamPicker setExamId={setExamId} authorization={props.authorization} />

      {loading && <p>Loading...</p>}

      {errorLoadingExam && (
        <p className="error-warning">
          Sorry we experienced an error loading exam number "{examId}". Please
          try again later.
        </p>
      )}

      {errorLoadingRubric && (
        <p className="error-warning">
          Sorry we experienced an error loading the <em>rubric</em> for exam
          number "{examId}". Please try again later.
        </p>
      )}

      {errorDeleting && (
        <p className="error-warning">
          Sorry we experienced an error deleting question "{questionIndex + 1}"
          for exam number "{examId}". Please try again later.
        </p>
      )}

      {examData.examNumber > 0 && !errorLoadingExam && !errorLoadingRubric && (
        <QuestionSection />
      )}
      <hr />
    </main>
  );
};

export default Edit;
