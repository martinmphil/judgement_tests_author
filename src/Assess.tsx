import React, { useState, useEffect } from "react";
import "./Assess.css";
import { backend } from "./ConfigAssessor";
import ExamPicker from "./ExamPicker";

interface Props {
  authorization: string;
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
  candidateId: number;
  candidateAnswers: Array<IQuestionResult>;
}

const Assessor: React.FC<Props> = props => {
  const [examId, setExamId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorLoadingRubric, setErrorLoadingRubric] = useState(false);
  const [errorLoadingSubmissions, setErrorLoadingSubmissions] = useState(false);
  const [csvReady, setCsvReady] = useState(false);
  const [outOf, setOutOf] = useState(0);
  const [examReport, setExamReport] = useState<IResultRow[]>([
    {
      totalScore: 0,
      percentage: 0,
      name: "",
      email: "",
      candidateId: 0,
      candidateAnswers: [
        { qScore: 0, a: "", b: "", c: "", d: "", timestamp: "", ip: "" }
      ]
    }
  ]);

  useEffect(() => {
    if (examId > 0) {
      fetchMarkingPile(examId);
    }
    //
    //
    // REMOVE
    //
    console.log("examId has changed to ", examId);
  }, [examId]);

  const fetchMarkingPile = (examNbr: number) => {
    //
    //
    // REMOVE
    //
    console.log("fetching marking pile for exam", examNbr);
  };

  const downloadCsv = () => {
    // Set the rightmost column headings for many questions
    // by processing just the first array element of the examReport.
    const qMarkSheetHead = examReport[0].candidateAnswers.map(
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
          x.candidateId,
          x.candidateAnswers.map(y => {
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
          Sorry we experienced an error loading <em>rubric</em> exam number "
          {examId}". Please try again later.
        </p>
      )}

      {errorLoadingSubmissions && (
        <p className="error-warning">
          Sorry we experienced an error loading <em>submissions</em> for exam
          number "{examId}". Please try again later.
        </p>
      )}

      {csvReady && <p>Out of {outOf}</p>}

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
                <tr key={x.candidateId.toString()}>
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
