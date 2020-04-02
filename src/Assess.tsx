import React, { useState, useEffect } from "react";
import "./Assess.css";
import { backend } from "./ConfigAssessor";
import ExamPicker from "./ExamPicker";

interface Props {
  authorization: string;
}

interface IScenarioRubric {
  best: number;
  worst: number;
}

interface IScenarioSubmissions {
  best: number;
  worst: number;
  ip: string | null;
  timestamp: string;
}

interface ICandidateSubmissions {
  name: string;
  email: string;
  submissions: Array<IScenarioSubmissions>;
}

interface IQuestionResult {
  qScore: number;
  a: string;
  b: string;
  c: string;
  d: string;
  timestamp: string;
  ip: string;
}
interface IResultRow {
  totalScore: number;
  percentage: number;
  name: string;
  email: string;
  markedSubmissions: Array<IQuestionResult>;
}

const Assessor: React.FC<Props> = props => {
  const [examId, setExamId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorLoadingRubric, setErrorLoadingRubric] = useState(false);
  const [errorLoadingMarkingPile, setErrorMarkingPile] = useState(false);
  const [csvReady, setCsvReady] = useState(false);
  const [outOf, setOutOf] = useState(0);
  const [examReport, setExamReport] = useState<IResultRow[]>([
    {
      totalScore: 0,
      percentage: 0,
      name: "",
      email: "",
      markedSubmissions: [
        { qScore: 0, a: "", b: "", c: "", d: "", timestamp: "", ip: "" }
      ]
    }
  ]);

  useEffect(() => {
    if (examId > 0) {
      setLoading(true);

      const fetchRubric = (pickedExam: number) => {
        return fetch(`${backend}exams/${pickedExam}/rubric`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: props.authorization
          }
        })
          .then(response => {
            setLoading(false);
            if (!response.ok) {
              setErrorLoadingRubric(true);
            } else {
              return response.json();
            }
          })
          .then(data => {
            return data;
          })
          .catch(error => {
            setErrorLoadingRubric(true);
            console.error("Error:", error);
          });
      };

      const fetchSubmissions = (pickedExam: number) => {
        return fetch(`${backend}candidates/allsubmissions/${pickedExam}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: props.authorization
          }
        })
          .then(response => {
            setLoading(false);
            if (!response.ok) {
              setErrorMarkingPile(true);
            } else {
              return response.json();
            }
          })
          .then(data => {
            return data;
          })
          .catch(error => {
            setErrorMarkingPile(true);
            console.error("Error:", error);
          });
      };

      const processMarkingPile = (
        rubric: IScenarioRubric[],
        markingPile: ICandidateSubmissions[]
      ) => {
        const results = markingPile.map(paper => {
          return markPaper(rubric, paper);
        });

        //
        // REMOVE
        // console.log(rubric);
        // console.log(markingPile);

        // is return value needed?

        return results;
      };

      const markPaper = (
        rubric: IScenarioRubric[],
        paper: ICandidateSubmissions
      ) => {
        const markedSubmissions = rubric.map((x, index) => {
          return markQuestion(x, paper.submissions[index]);
        });

        const highestAvailableScore = rubric
          .map((x: IScenarioRubric) => {
            if (x.best > -1 && x.worst > -1) {
              return 2;
            } else if (x.best > -1 || x.worst > -1) {
              return 1;
            } else {
              return 0;
            }
          })
          .reduce(
            (accumulator: number, currentValue: number) =>
              accumulator + currentValue,
            0
          );
        setOutOf(highestAvailableScore);

        const totalScore = markedSubmissions.reduce(
          (accumulator, currentValue) => accumulator + currentValue.qScore,
          0
        );

        const percentage = Math.round(
          (totalScore / highestAvailableScore) * 100
        );

        return {
          totalScore,
          percentage,
          name: paper.name,
          email: paper.email,
          markedSubmissions
        };
      };

      const markQuestion = (
        idealQAnswers: IScenarioRubric,
        candidateQAnswers: IScenarioSubmissions = {
          best: -1,
          worst: -2,
          ip: "",
          timestamp: ""
        }
      ) => {
        let qResult: IQuestionResult = {
          qScore: 0,
          a: "",
          b: "",
          c: "",
          d: "",
          timestamp: "",
          ip: ""
        };

        if (
          idealQAnswers.best === candidateQAnswers.best &&
          idealQAnswers.worst === candidateQAnswers.worst
        ) {
          qResult.qScore = 2;
        } else if (
          idealQAnswers.best === candidateQAnswers.best ||
          idealQAnswers.worst === candidateQAnswers.worst
        ) {
          qResult.qScore = 1;
        } else qResult.qScore = 0;

        // Array [0,1,2,3,] represents judgements-options a, b, c & d.
        const judgementsArray = [0, 1, 2, 3].map(x => {
          if (x === idealQAnswers.best && x === candidateQAnswers.best) {
            return "1";
          } else if (
            x === idealQAnswers.worst &&
            x === candidateQAnswers.worst
          ) {
            return "1";
          } else if (x === candidateQAnswers.best && idealQAnswers.best > -1) {
            return "0";
          } else if (
            x === candidateQAnswers.worst &&
            idealQAnswers.worst > -1
          ) {
            return "0";
          }
          // Some scenarios mark only best or worst, NOT both.
          else return "";
        });

        qResult.a = judgementsArray[0];
        qResult.b = judgementsArray[1];
        qResult.c = judgementsArray[2];
        qResult.d = judgementsArray[3];
        if (candidateQAnswers.timestamp) {
          qResult.timestamp = candidateQAnswers.timestamp.substring(0, 19);
        }
        if (candidateQAnswers.ip) {
          qResult.ip = candidateQAnswers.ip;
        }

        return qResult;
      };

      Promise.all([fetchRubric(examId), fetchSubmissions(examId)])
        .then(fetchedData => {
          let x = processMarkingPile(fetchedData[0], fetchedData[1]);
          console.log(x);
          setLoading(false);

          //
          //
          // TO RMEMOVE
          // console.log(fetchedData[0][3]);
          // let x = markQuestion(fetchedData[0][3], {
          //   best: 0,
          //   worst: 3,
          //   ip: "",
          //   timestamp: ""
          // });
          // console.log(x);
          //
          //
        })
        .catch(error => {
          setLoading(false);
          console.error(error.message);
        });
    }
  }, [examId, props.authorization]);

  const downloadCsv = () => {
    // Set the rightmost column headings for many questions
    // by processing just the first array element of the examReport.
    const qMarkSheetHead = examReport[0].markedSubmissions.map(
      (x: any, i: number) => {
        return `Q${i + 1}score,Q${i + 1}a,Q${i + 1}b,Q${i + 1}c,Q${i +
          1}d,Q${i + 1}timestamp,Q${i + 1}ip`;
      }
    );
    // Set all csv column headings for this exam.
    const csvColHead = `Score,Percentage,Name,E-mail,Candidate_id,${qMarkSheetHead}`;

    // Process examReport for csv.

    const csvRows = examReport.map(x => {
      return (
        [
          x.totalScore,
          x.percentage,
          x.name,
          x.email,
          x.markedSubmissions.map(y => {
            return [y.qScore, y.a, y.b, y.c, y.d, y.timestamp, y.ip];
          })
        ].join(",") + "\n"
      );
    });

    const csv = csvColHead.concat(`\n`, csvRows.join(""));

    const dateNow = new Date();
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    a.target = "_blank";
    a.download = `exam_${examId}_(marks_out_of_${outOf})_${dateNow
      .toISOString()
      .substring(0, 10)}.csv`;
    a.click();

    setCsvReady(true);
  };

  return (
    <main>
      <h1>Assessor</h1>

      <ExamPicker setExamId={setExamId} authorization={props.authorization} />

      <section>
        <button
          onClick={() => downloadCsv()}
          id="downloadButton"
          disabled={!csvReady}
        >
          Download
        </button>
        full results csv file.
      </section>
      <h2>Summary</h2>

      {loading && <p>Loading...</p>}

      {errorLoadingRubric && (
        <p className="error-warning">
          Sorry we experienced an error loading <em>rubric</em> for exam number
          "{examId}". Please try again later.
        </p>
      )}

      {errorLoadingMarkingPile && (
        <p className="error-warning">
          Sorry we experienced an error loading <em>submissions</em> for exam
          number "{examId}". Please try again later.
        </p>
      )}

      {csvReady && <p>Out of {outOf}</p>}

      {/* TO REMOVE */}
      {<p>Out of {outOf}</p>}
      {/* TO REMOVE */}

      {csvReady && (
        <table>
          <caption>Exam {examId} results</caption>
          <tbody>
            <tr>
              <th scope="col">Score</th>
              <th scope="col">Name</th>
              <th scope="col">E-mail</th>
            </tr>
            {examReport.map(x => {
              return (
                <tr key={x.email}>
                  <td>{x.totalScore}</td>
                  <td>{x.name}</td>
                  <td>{x.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default Assessor;
