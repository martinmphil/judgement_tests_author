import React from "react";

interface Props {
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

const scenarioFrame: React.FC<Props> = (props) => {
  // const [a, setA] = useState("");

  function changeSituation(event: { currentTarget: { value: any } }) {
    const x = event.currentTarget.value;
    props.setSituation(x);
  }

  return (
    <section>
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
            defaultValue={props.situation}
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
      </form>
    </section>
  );
};

export default scenarioFrame;
