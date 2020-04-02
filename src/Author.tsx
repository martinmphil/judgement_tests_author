import React, { useState } from "react";
import "./Author.css";
import sampleExam from "./SampleAuthorData";

const Author: React.FC = () => {
  const [examId, setExamId] = useState(1);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [idealBest, setIdealBest] = useState(0);
  const [idealWorst, setIdealWorst] = useState(0);

  // editing exam questions needs to get rubric from server to set best and worst ideal answer

  const createExam = () => {
    setExamId(888);
    setIsLoading(false);
    setLoadingError(false);
    setQuestionNumber(1);
  };

  const createQuestion = () => {
    setQuestionNumber(11);
  };

  const examNbrChange = (event: React.FormEvent<HTMLInputElement>) => {
    let x = parseInt(event.currentTarget.value);
    if (Number.isInteger(x)) {
      setExamId(x);
    }
  };

  const submitExamNbr = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("you submitted an exam number");
    if (examId > 0) {
      setIsLoading(false);
    }
  };

  const questionNbrChange = (event: React.FormEvent<HTMLInputElement>) => {
    let x = parseInt(event.currentTarget.value);
    if (Number.isInteger(x)) {
      setQuestionNumber(x);
    }
  };

  const submitQuestionNbr = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // NB if exam fully loaded, then selecting question number could be reactive.
    alert("you submitted a question number");
  };

  const selectingIdealBestOption = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    let x = parseInt(event.currentTarget.value);
    if (Number.isInteger(x)) {
      setIdealBest(x);
    }
  };

  const selectingIdealWorstOption = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    let x = parseInt(event.currentTarget.value);
    if (Number.isInteger(x)) {
      setIdealWorst(x);
    }
  };

  const submitQuestion = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Test for differing values as ideal best and ideal worst options.
    // unless both remain unset.
    if (idealBest === idealWorst && idealBest > 0) {
      alert("Please select options for Best and Worst that differ.");
    } else {
      alert("processing your inputted text");
    }
  };

  return (
    <main>
      <h1>Author</h1>
      <button onClick={createExam}>Start new exam</button>
      {/* react controlled component */}
      <form onSubmit={submitExamNbr}>
        <label htmlFor="exam">
          Exam id nbr:
          <input
            type="number"
            className="number-input"
            id="exam"
            onChange={examNbrChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {isLoading && <p>Loading...</p>}
      {loadingError && (
        <p className="error-warning">
          Sadly we experienced a loading error. Please refresh this page, or try
          again later.
        </p>
      )}
      {!isLoading && (
        <main>
          <h2>Exam number {examId}</h2>
          {/* react controlled component */}
          <form onSubmit={submitQuestionNbr}>
            <label htmlFor="question-picker">
              Edit existing question number:
              <input
                type="number"
                className="number-input"
                id="question-picker"
                onChange={questionNbrChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <p>
            <button onClick={createQuestion}>Create new</button> question,
            scenario text and answer option.
          </p>
          <hr />
          <form onSubmit={submitQuestion}>
            <section>
              <h2>Question number {questionNumber}</h2>
              <label htmlFor="scenario-text">Scenario text</label>
              <br />
              <textarea
                name="scenario-text"
                id="scenario-text"
                cols={60}
                rows={10}
                defaultValue={sampleExam.scenarios[1].situation}
              ></textarea>
            </section>
            <fieldset>
              <legend>Option texts</legend>

              <label htmlFor="optA">Option A</label>
              <br />
              <textarea
                name="scenario-text"
                id="optA"
                cols={60}
                rows={4}
                defaultValue={sampleExam.scenarios[1].optionText[0]}
              ></textarea>
              <br />

              <label htmlFor="optB">Option B</label>
              <br />
              <textarea
                name="scenario-text"
                id="optB"
                cols={60}
                rows={4}
                defaultValue={sampleExam.scenarios[1].optionText[1]}
              ></textarea>
              <br />

              <label htmlFor="optC">Option C</label>
              <br />
              <textarea
                name="scenario-text"
                id="optC"
                cols={60}
                rows={4}
                defaultValue={sampleExam.scenarios[1].optionText[2]}
              ></textarea>
              <br />

              <label htmlFor="optD">Option D</label>
              <br />
              <textarea
                name="scenario-text"
                id="optD"
                cols={60}
                rows={4}
                defaultValue={sampleExam.scenarios[1].optionText[3]}
              ></textarea>
            </fieldset>

            <fieldset>
              <legend>Select ideal Best option.</legend>
              <p>
                <input
                  type="radio"
                  id="bestOptA"
                  name="best"
                  value="1"
                  onChange={selectingIdealBestOption}
                />
                <label htmlFor="bestOptA">Option A as Best</label>
              </p>
              <p>
                <input
                  type="radio"
                  id="bestOptB"
                  name="best"
                  value="2"
                  onChange={selectingIdealBestOption}
                />
                <label htmlFor="bestOptB">Option B as Best</label>
              </p>
              <p>
                <input
                  type="radio"
                  id="bestOptC"
                  name="best"
                  value="3"
                  onChange={selectingIdealBestOption}
                />
                <label htmlFor="bestOptC">Option C as Best</label>
              </p>
              <p>
                <input
                  type="radio"
                  id="bestOptD"
                  name="best"
                  value="4"
                  onChange={selectingIdealBestOption}
                />
                <label htmlFor="bestOptD">Option D as Best</label>
              </p>
            </fieldset>

            <fieldset>
              <legend>Select ideal Worst option.</legend>
              <p>
                <input
                  type="radio"
                  id="worstOptA"
                  name="worst"
                  value="1"
                  onChange={selectingIdealWorstOption}
                />
                <label htmlFor="worstOptA">Option A as Worst</label>
              </p>
              <p>
                <input
                  type="radio"
                  id="worstOptB"
                  name="worst"
                  value="2"
                  onChange={selectingIdealWorstOption}
                />
                <label htmlFor="worstOptB">Option B as Worst</label>
              </p>
              <p>
                <input
                  type="radio"
                  id="worstOptC"
                  name="worst"
                  value="3"
                  onChange={selectingIdealWorstOption}
                />
                <label htmlFor="worstOptC">Option C as Worst</label>
              </p>
              <p>
                <input
                  type="radio"
                  id="worstOptD"
                  name="worst"
                  value="4"
                  onChange={selectingIdealWorstOption}
                />
                <label htmlFor="worstOptD">Option D as Worst</label>
              </p>
            </fieldset>

            <input type="submit" value="Submit question" />
          </form>
        </main>
      )}
    </main>
  );
};

export default Author;
