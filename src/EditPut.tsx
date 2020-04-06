import React, { useState } from "react";
import { backend } from "./ConfigAssessor";

interface Props {
  authorization: string;
  examId: number;
  questionIndex: number;
  situation: string;
  judgements: string[];
  idealBest: number;
  idealWorst: number;
}

const EditPut: React.FC<Props> = (props) => {
  const [newSituation, setNewSituation] = useState(props.situation);
  const [newJudgementA, setNewJudgementA] = useState(props.judgements[0]);
  const [newJudgementB, setNewJudgementB] = useState(props.judgements[1]);
  const [newJudgementC, setNewJudgementC] = useState(props.judgements[2]);
  const [newJudgementD, setNewJudgementD] = useState(props.judgements[3]);
  const [newBest, setNewBest] = useState(props.idealBest);
  const [newWorst, setNewWorst] = useState(props.idealWorst);

  const [errrorUploading, setErrrorUploading] = useState(false);

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
    // setErrrorUploading(false);
    // console.log(putBody);
    // console.log(backend);
    //
    //
    //

    return fetch(
      `${backend}exams/${props.examId}/scenario/${props.questionIndex}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: props.authorization,
        },
        body: JSON.stringify(putBody),
      }
    )
      .then((response) => {
        if (!response.ok) {
          setErrrorUploading(true);
        }
      })
      .catch((error) => {
        setErrrorUploading(true);
        console.error("Error:", error);
      });
  };

  const submitQuestion = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (newBest === newWorst) {
      alert("Please select options for Best and Worst that differ.");
    } else {
      putUpdate();
      window.scrollTo(0, 0);
    }
  };

  return (
    <section>
      {errrorUploading && (
        <p className="error-warning">
          Sorry we experienced an error up-loading to exam number "
          {props.examId}". Please try again later.
        </p>
      )}

      <form>
        <section>
          <h2>Question number {props.questionIndex + 1}</h2>
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
        <button onClick={submitQuestion}>Save changes</button>
      </form>
    </section>
  );
};

export default EditPut;
