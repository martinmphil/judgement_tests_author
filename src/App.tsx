import React, { useState, useEffect } from "react";
import "./App.css";
import Question from "./Question";
import Outro from "./Outro";
import Instruct from "./Instruct";
import Progress from "./Progress";

const App: React.FC = () => {
  const [examPaper, setExamPaper] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showOutro, setShowOutro] = useState(false);
  const [candidateId, setCandidateId] = useState(0);
  const [candidateName, setCandidateName] = useState("");
  const [examId, setExamId] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [examLength, setExamLength] = useState(0);
  const [best, setBest] = useState(0);
  const [worst, setWorst] = useState(0);

  const selectBest = (x: number) => {
    if (best === x) {
      setBest(0);
    } else {
      setBest(x);
    }
  };

  const selectWorst = (x: number) => {
    if (worst === x) {
      setWorst(0);
    } else {
      setWorst(x);
    }
  };

  useEffect(() => {
    // ​Identify current exam number from URL path name eg /101
    const currentExamNbr: number = parseInt(
      window.location.pathname.replace(/\//gi, "")
    );
    setExamId(currentExamNbr);

    // ​Identify current user's idToken from URL search parameters eg ?idToken=123
    let userIdToken: number = 0;
    const searchParams = new URLSearchParams(window.location.search);
    const idTokenString = searchParams.get("idToken");
    if (idTokenString) {
      userIdToken = parseInt(idTokenString);
      setCandidateId(userIdToken);
    }

    // Fetch Exam in Progress
    // Array of URLs for getting candidate's exam and current question from server.
    const urls: string[] = [
      `https://lanroth.com/sjt-backend/exams/${currentExamNbr}/`,
      `https://lanroth.com/sjt-backend/candidates/current-question/${currentExamNbr}/`,
      `https://lanroth.com/sjt-backend/candidates/${userIdToken}/`
    ];
    // Awaiting promises (one for each URL) before proceeding.
    Promise.all(
      // Apply fetch to all URLs in our "urls" array.
      urls.map(url =>
        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "candidate-token": userIdToken.toString()
          }
        })
          .then(response => {
            // Test for "ok" reponse from server
            if (!response.ok) {
              setLoadingError(true);
              setIsLoading(false);
            } else return response.json();
          })
          .catch(error => {
            setLoadingError(true);
            setIsLoading(false);
            console.error("Error:", error);
          })
      )
    )
      // The Promise.all then fufills to an array
      // [fetched_exam, fetched_q_nbr, candidate_name]
      .then(fetchedData => {
        setExamPaper(fetchedData[0].questions);
        setExamLength(fetchedData[0].questions.length);
        // NB question numbers on server-array index from zero not one
        setQuestionNumber(fetchedData[1].questionNum + 1);
        setCandidateName(fetchedData[2].name);
        if (
          // Test if candidate has already completed this exam.
          // Server indicates exam complete by returning current question === exam length
          // which is outside range given server-array indexes from zero not one
          fetchedData[1].questionNum + 1 >
          fetchedData[0].questions.length
        ) {
          setIsLoading(false);
          setShowQuestion(false);
          setShowOutro(true);
        } else if (
          // Test exam nbr, user id and exam text have been updated.
          currentExamNbr > 0 &&
          userIdToken > 0 &&
          fetchedData[0].questions.length > 0
        ) {
          setIsLoading(false);
          setShowQuestion(true);
        } else setLoadingError(true);
      })
      .catch(error => {
        setLoadingError(true);
        setIsLoading(false);
        console.error("Error:", error);
      });
  }, []);

  // sending data to server
  const sendAttempt = () => {
    // NB question numbers on server-array index from zero not one, hence ${questionNumber -1}
    const url = `https://lanroth.com/sjt-backend/candidates/answers/${examId}/${questionNumber -
      1}/`;
    const candidateAnswer = { best, worst };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "candidate-token": candidateId.toString()
      },
      body: JSON.stringify(candidateAnswer)
    })
      .then(response => {
        if (!response.ok) {
          setSubmissionError(true);
        } else {
          setSubmissionError(false);
        }
      })
      .catch(error => {
        setSubmissionError(true);
        console.error("Error:", error);
      });
  };

  const submitHandling = () => {
    if (best === 0 || worst === 0) {
      alert("You MUST select one Best option AND one Worst option");
    } else {
      if (questionNumber < examLength) {
        setSubmissionError(false);
        sendAttempt();
        setQuestionNumber(questionNumber + 1);
        setBest(0);
        setWorst(0);
      } else {
        setSubmissionError(false);
        sendAttempt();
        setShowQuestion(false);
        setShowOutro(true);
      }
    }
  };

  return (
    <div className="App">
      {isLoading && <p>Loading...</p>}
      {loadingError && (
        <p className="error-warning">
          Sadly we experienced a loading error. Please refresh this page, or try
          again later.
        </p>
      )}
      {showQuestion && (
        <article>
          <Instruct candidateName={candidateName} />
          <Progress examLength={examLength} questionNumber={questionNumber} />
          <Question
            submissionError={submissionError}
            questionNumber={questionNumber}
            scenarioText={examPaper[questionNumber - 1]["question"]}
            optTextA={examPaper[questionNumber - 1]["answers"][0]}
            optTextB={examPaper[questionNumber - 1]["answers"][1]}
            optTextC={examPaper[questionNumber - 1]["answers"][2]}
            optTextD={examPaper[questionNumber - 1]["answers"][3]}
            submitHandling={submitHandling}
            selectBest={selectBest}
            selectWorst={selectWorst}
            best={best}
            worst={worst}
          />
        </article>
      )}
      {showOutro && <Outro />}
    </div>
  );
};

export default App;
