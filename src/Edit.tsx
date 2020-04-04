import React, { useState, useEffect } from "react";
import "./Edit.css";
import { backend } from "./ConfigAssessor";
import ExamPicker from "./ExamPicker";
import QuestionPicker from "./QuestionPicker";
import ScenarioFrame from "./ScenarioFrame";

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
  const [errorLoadingRubic, setErrorLoadingRubric] = useState(false);
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
            setLoading(false);
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
            setLoading(false);
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
          setIdealBest(fetchedData[0][questionIndex].best);
          setIdealWorst(fetchedData[0][questionIndex].worst);

          setExamData(fetchedData[1]);

          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error(error.message);
        });
    }

    // if (examId > 0) {
    //   fetchExam(examId);
    // }

    //
    //
    //
    // TO REMOVE
    // console.log("ideal best is " + idealBest);
    // console.log("ideal worst is " + idealWorst);

    //
    //
    //
  }, [examId, props.authorization, questionIndex]);

  const QuestionSection = () => {
    return (
      <section>
        <h1>{examData.title}</h1>
        <h2>Exam number {examData.examNumber}</h2>
        <QuestionPicker
          scenarios={examData.scenarios}
          questionIndex={questionIndex}
          setQuestionIndex={setQuestionIndex}
        />
        <ScenarioFrame
          questionIndex={questionIndex}
          situation={examData.scenarios[questionIndex].situation}
          judgements={examData.scenarios[questionIndex].judgements}
          idealBest={idealBest}
          idealWorst={idealWorst}
          setIdealBest={setIdealBest}
          setIdealWorst={setIdealWorst}
        />
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

      {errorLoadingRubic && (
        <p className="error-warning">
          Sorry we experienced an error loading rubric for number "{examId}".
          Please try again later.
        </p>
      )}

      {examData.examNumber > 0 && <QuestionSection />}

      {/* TO REMOVE */}

      <p>ideal best is {idealBest}</p>
      <p>ideal worst is {idealWorst}</p>
      {/* TO REMOVE */}
    </main>
  );
};

export default Edit;
