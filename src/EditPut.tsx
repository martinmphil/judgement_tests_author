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
  setIdealBest: (x: number) => void;
  setIdealWorst: (x: number) => void;
  setSituation: (x: string) => void;
  setJudgementA: (x: string) => void;
  setJudgementB: (x: string) => void;
  setJudgementC: (x: string) => void;
  setJudgementD: (x: string) => void;
}

const EditPut: React.FC<Props> = (props) => {
  const [newSituation, setNewSituation] = useState(props.situation);
  const [errrorUploading, setErrrorUploading] = useState(false);

  function changeSituation(event: { currentTarget: { value: any } }) {
    setNewSituation(event.currentTarget.value);
  }

  const putUpdate = () => {
    const putBody = {
      best: props.idealBest,
      judgements: [
        props.judgements[0],
        props.judgements[1],
        props.judgements[2],
        props.judgements[3],
      ],
      situation: newSituation,
      worst: props.idealWorst,
    };

    console.log(props.authorization);

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
        } else {
          return response.json();
        }
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        setErrrorUploading(true);
        console.error("Error:", error);
      });
  };

  const submitQuestion = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("we pressed it");
    if (props.idealBest === props.idealWorst) {
      alert("Please select options for Best and Worst that differ.");
    } else {
      console.log("processing your inputted text");
      putUpdate();
    }
  };

  return (
    <section>
      {/* TO REMOVE */}
      {props.idealBest}

      {errrorUploading && (
        <p className="error-warning">
          Sorry we experienced an error up-loading to exam number "
          {props.examId}". Please try again later.
        </p>
      )}

      <p>Question index is {props.questionIndex}</p>

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
            defaultValue={props.judgements[0]}
          ></textarea>
          <br />

          <label htmlFor="optB">Option B</label>
          <br />
          <textarea
            name="judgement-text"
            id="optB"
            cols={60}
            rows={4}
            defaultValue={props.judgements[1]}
          ></textarea>
          <br />

          <label htmlFor="optC">Option C</label>
          <br />
          <textarea
            name="judgement-text"
            id="optC"
            cols={60}
            rows={4}
            defaultValue={props.judgements[2]}
          ></textarea>
          <br />

          <label htmlFor="optD">Option D</label>
          <br />
          <textarea
            name="judgement-text"
            id="optD"
            cols={60}
            rows={4}
            defaultValue={props.judgements[3]}
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
              checked={props.idealBest === 0 ? true : false}
              onChange={() => props.setIdealBest(0)}
            />
            <label htmlFor="bestOptA">Option A as Best</label>
          </p>
          <p>
            <input
              type="radio"
              id="bestOptB"
              name="best"
              value="1"
              checked={props.idealBest === 1 ? true : false}
              onChange={() => props.setIdealBest(1)}
            />
            <label htmlFor="bestOptB">Option B as Best</label>
          </p>
          <p>
            <input
              type="radio"
              id="bestOptC"
              name="best"
              value="2"
              checked={props.idealBest === 2 ? true : false}
              onChange={() => props.setIdealBest(2)}
            />
            <label htmlFor="bestOptC">Option C as Best</label>
          </p>
          <p>
            <input
              type="radio"
              id="bestOptD"
              name="best"
              value="3"
              checked={props.idealBest === 3 ? true : false}
              onChange={() => props.setIdealBest(3)}
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
              checked={props.idealWorst === 0 ? true : false}
              onChange={() => props.setIdealWorst(0)}
            />
            <label htmlFor="worstOptA">Option A as Worst</label>
          </p>
          <p>
            <input
              type="radio"
              id="worstOptB"
              name="worst"
              value="1"
              checked={props.idealWorst === 1 ? true : false}
              onChange={() => props.setIdealWorst(1)}
            />
            <label htmlFor="worstOptB">Option B as Worst</label>
          </p>
          <p>
            <input
              type="radio"
              id="worstOptC"
              name="worst"
              value="2"
              checked={props.idealWorst === 2 ? true : false}
              onChange={() => props.setIdealWorst(2)}
            />
            <label htmlFor="worstOptC">Option C as Worst</label>
          </p>
          <p>
            <input
              type="radio"
              id="worstOptD"
              name="worst"
              value="3"
              checked={props.idealWorst === 3 ? true : false}
              onChange={() => props.setIdealWorst(3)}
            />
            <label htmlFor="worstOptD">Option D as Worst</label>
          </p>
        </fieldset>
        <button onClick={submitQuestion}>Submit question</button>
      </form>
    </section>
  );
};

export default EditPut;
