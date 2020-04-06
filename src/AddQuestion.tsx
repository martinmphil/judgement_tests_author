import React, { useState } from "react";
import "./AddQuestion.css";
import { backend } from "./ConfigAssessor";
import ExamPicker from "./ExamPicker";

interface Props {
  authorization: string;
}

const AddQuestion: React.FC<Props> = (props) => {
  const [examId, setExamId] = useState(1);
  const [newSituation, setNewSituation] = useState("");
  const [newJudgementA, setNewJudgementA] = useState("");
  const [newJudgementB, setNewJudgementB] = useState("");
  const [newJudgementC, setNewJudgementC] = useState("");
  const [newJudgementD, setNewJudgementD] = useState("");
  const [newBest, setNewBest] = useState(3);
  const [newWorst, setNewWorst] = useState(0);

  const [errorUploading, setErrorUploading] = useState(false);

  const changeSituation = (event: { target: { value: any } }) => {
    setNewSituation(event.target.value);
  };
  const changeJudgementA = (event: { target: { value: any } }) => {
    setNewJudgementA(event.target.value);
  };
  const changeJudgementB = (event: { target: { value: any } }) => {
    setNewJudgementB(event.target.value);
  };
  const changeJudgementC = (event: { target: { value: any } }) => {
    setNewJudgementC(event.target.value);
  };
  const changeJudgementD = (event: { target: { value: any } }) => {
    setNewJudgementD(event.target.value);
  };

  const putUpdate = () => {
    const putBody = {
      situation: newSituation,
      best: newBest,
      worst: newWorst,
      judgements: [newJudgementA, newJudgementB, newJudgementC, newJudgementD],
    };

    //
    //
    // TO REMOVE
    //
    //
    setErrorUploading(false);
    console.log(putBody);
    console.log(backend);
    //
    //
    //

    // return fetch(
    //   `${backend}exams/${props.examId}/scenario/${props.questionIndex}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       authorization: props.authorization,
    //     },
    //     body: JSON.stringify(putBody),
    //   }
    // )
    //   .then((response) => {
    //     if (!response.ok) {
    //       setErrorUploading(true);
    //     }
    //   })
    //   .catch((error) => {
    //     setErrorUploading(true);
    //     console.error("Error:", error);
    //   });
    //
  };

  const submitQuestion = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (newBest === newWorst) {
      alert("Please select options for Best and Worst that differ.");
    } else {
      putUpdate();
      window.location.reload();
      window.scrollTo(0, 0);
    }
  };

  return (
    <main>
      <h1>Add Question</h1>

      {errorUploading && (
        <p className="error-warning">
          Sorry we experienced an error up-loading to exam number "{examId}".
          Please try again later.
        </p>
      )}

      <ExamPicker authorization={props.authorization} setExamId={setExamId} />

      <h2>New question text</h2>

      <h3>For exam number: {examId}</h3>

      <form>
        <section>
          <label htmlFor="scenario-text">Scenario text</label>
          <br />
          <textarea
            name="scenario-text"
            id="scenario-text"
            cols={60}
            rows={10}
            defaultValue={newSituation}
            onChange={changeSituation}
          ></textarea>
        </section>
        <fieldset>
          <legend>Option texts</legend>

          <label htmlFor="optA">Option A</label>
          <br />
          <textarea
            name="judgement-text"
            id="optA"
            cols={60}
            rows={4}
            defaultValue={newJudgementA}
            onChange={changeJudgementA}
          ></textarea>
          <br />

          <label htmlFor="optB">Option B</label>
          <br />
          <textarea
            name="judgement-text"
            id="optB"
            cols={60}
            rows={4}
            defaultValue={newJudgementB}
            onChange={changeJudgementB}
          ></textarea>
          <br />

          <label htmlFor="optC">Option C</label>
          <br />
          <textarea
            name="judgement-text"
            id="optC"
            cols={60}
            rows={4}
            defaultValue={newJudgementC}
            onChange={changeJudgementC}
          ></textarea>
          <br />

          <label htmlFor="optD">Option D</label>
          <br />
          <textarea
            name="judgement-text"
            id="optD"
            cols={60}
            rows={4}
            defaultValue={newJudgementD}
            onChange={changeJudgementD}
          ></textarea>
        </fieldset>

        <fieldset>
          <legend>Select ideal Best option.</legend>
          <p>
            <input
              type="radio"
              id="bestOptA"
              name="best"
              value="0"
              checked={newBest === 0 ? true : false}
              onChange={() => setNewBest(0)}
            />
            <label htmlFor="bestOptA">Option A as Best</label>
          </p>
          <p>
            <input
              type="radio"
              id="bestOptB"
              name="best"
              value="1"
              checked={newBest === 1 ? true : false}
              onChange={() => setNewBest(1)}
            />
            <label htmlFor="bestOptB">Option B as Best</label>
          </p>
          <p>
            <input
              type="radio"
              id="bestOptC"
              name="best"
              value="2"
              checked={newBest === 2 ? true : false}
              onChange={() => setNewBest(2)}
            />
            <label htmlFor="bestOptC">Option C as Best</label>
          </p>
          <p>
            <input
              type="radio"
              id="bestOptD"
              name="best"
              value="3"
              checked={newBest === 3 ? true : false}
              onChange={() => setNewBest(3)}
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
              value="0"
              checked={newWorst === 0 ? true : false}
              onChange={() => setNewWorst(0)}
            />
            <label htmlFor="worstOptA">Option A as Worst</label>
          </p>
          <p>
            <input
              type="radio"
              id="worstOptB"
              name="worst"
              value="1"
              checked={newWorst === 1 ? true : false}
              onChange={() => setNewWorst(1)}
            />
            <label htmlFor="worstOptB">Option B as Worst</label>
          </p>
          <p>
            <input
              type="radio"
              id="worstOptC"
              name="worst"
              value="2"
              checked={newWorst === 2 ? true : false}
              onChange={() => setNewWorst(2)}
            />
            <label htmlFor="worstOptC">Option C as Worst</label>
          </p>
          <p>
            <input
              type="radio"
              id="worstOptD"
              name="worst"
              value="3"
              checked={newWorst === 3 ? true : false}
              onChange={() => setNewWorst(3)}
            />
            <label htmlFor="worstOptD">Option D as Worst</label>
          </p>
        </fieldset>
        <button onClick={submitQuestion}>Submit question</button>
      </form>
    </main>
  );
};

export default AddQuestion;
