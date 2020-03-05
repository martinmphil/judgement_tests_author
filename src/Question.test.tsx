import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";
// import ReactDOM from "react-dom";

import Question from "./Question";
import SampleQuestionText from "./SampleQuestionText";

afterEach(cleanup);

test("candidate can see scenario text", () => {
  const { getByLabelText, container } = render(
    <Question
      submissionError={false}
      questionNumber={1}
      scenarioText={SampleQuestionText.scenarioText}
      optTextA={SampleQuestionText.optTextA}
      optTextB={SampleQuestionText.optTextB}
      optTextC={SampleQuestionText.optTextC}
      optTextD={SampleQuestionText.optTextD}
      submitHandling={jest.fn()}
      selectBest={jest.fn()}
      selectWorst={jest.fn()}
      best={0}
      worst={0}
    />
  );
  expect(container.querySelector("#scenarioText")).toHaveTextContent(
    SampleQuestionText.scenarioText
  );
  expect(container.querySelector("#optTextA")).toHaveTextContent(
    SampleQuestionText.optTextA
  );
  expect(container.querySelector("#optTextB")).toHaveTextContent(
    SampleQuestionText.optTextB
  );
  expect(container.querySelector("#optTextC")).toHaveTextContent(
    SampleQuestionText.optTextC
  );
  expect(container.querySelector("#optTextD")).toHaveTextContent(
    SampleQuestionText.optTextD
  );
  expect(getByLabelText("Option A is best")).toHaveTextContent("Best");
  expect(getByLabelText("Option D is worst")).toHaveTextContent("Worst");
});

test("button presses pass correct argument", () => {
  const selectBestMock = jest.fn();
  const selectWorstMock = jest.fn();
  const submitMock = jest.fn();
  const { getByLabelText, getByText } = render(
    <Question
      submissionError={false}
      questionNumber={1}
      scenarioText={""}
      optTextA={""}
      optTextB={""}
      optTextC={""}
      optTextD={""}
      submitHandling={submitMock}
      selectBest={selectBestMock}
      selectWorst={selectWorstMock}
      best={0}
      worst={0}
    />
  );

  fireEvent.click(getByLabelText("Option A is best"));
  expect(selectBestMock).toHaveBeenCalledTimes(1);
  expect(selectBestMock).toBeCalledWith(1);
  fireEvent.click(getByLabelText("Option B is best"));
  expect(selectBestMock).toHaveBeenCalledTimes(2);
  expect(selectBestMock).toBeCalledWith(2);
  fireEvent.click(getByLabelText("Option C is best"));
  expect(selectBestMock).toHaveBeenCalledTimes(3);
  expect(selectBestMock).toBeCalledWith(3);
  fireEvent.click(getByLabelText("Option D is best"));
  expect(selectBestMock).toHaveBeenCalledTimes(4);
  expect(selectBestMock).toBeCalledWith(4);

  fireEvent.click(getByLabelText("Option A is worst"));
  expect(selectWorstMock).toHaveBeenCalledTimes(1);
  expect(selectWorstMock).toBeCalledWith(1);
  fireEvent.click(getByLabelText("Option B is worst"));
  expect(selectWorstMock).toHaveBeenCalledTimes(2);
  expect(selectWorstMock).toBeCalledWith(2);
  fireEvent.click(getByLabelText("Option C is worst"));
  expect(selectWorstMock).toHaveBeenCalledTimes(3);
  expect(selectWorstMock).toBeCalledWith(3);
  fireEvent.click(getByLabelText("Option D is worst"));
  expect(selectWorstMock).toHaveBeenCalledTimes(4);
  expect(selectWorstMock).toBeCalledWith(4);

  fireEvent.click(getByText("Submit"));
  expect(submitMock).toHaveBeenCalledTimes(1);
});

test("best=0, worst=0 matches snapshot", () => {
  const selectBestMock = jest.fn();
  const selectWorstMock = jest.fn();
  const submitMock = jest.fn();
  const { asFragment, getByLabelText } = render(
    <Question
      submissionError={false}
      questionNumber={1}
      scenarioText={SampleQuestionText.scenarioText}
      optTextA={SampleQuestionText.optTextA}
      optTextB={SampleQuestionText.optTextB}
      optTextC={SampleQuestionText.optTextC}
      optTextD={SampleQuestionText.optTextD}
      submitHandling={submitMock}
      selectBest={selectBestMock}
      selectWorst={selectWorstMock}
      best={0}
      worst={0}
    />
  );
  expect(asFragment()).toMatchSnapshot();
  expect(getByLabelText("Option A is best")).not.toHaveAttribute("disabled");
  expect(getByLabelText("Option B is best")).not.toHaveAttribute("disabled");
  expect(getByLabelText("Option C is best")).not.toHaveAttribute("disabled");
  expect(getByLabelText("Option D is best")).not.toHaveAttribute("disabled");
  expect(getByLabelText("Option A is worst")).not.toHaveAttribute("disabled");
  expect(getByLabelText("Option B is worst")).not.toHaveAttribute("disabled");
  expect(getByLabelText("Option C is worst")).not.toHaveAttribute("disabled");
  expect(getByLabelText("Option D is worst")).not.toHaveAttribute("disabled");
});

test("best=1, worst=2 matches snapshot", () => {
  const selectBestMock = jest.fn();
  const selectWorstMock = jest.fn();
  const submitMock = jest.fn();
  const { asFragment, getByLabelText } = render(
    <Question
      submissionError={false}
      questionNumber={1}
      scenarioText={SampleQuestionText.scenarioText}
      optTextA={SampleQuestionText.optTextA}
      optTextB={SampleQuestionText.optTextB}
      optTextC={SampleQuestionText.optTextC}
      optTextD={SampleQuestionText.optTextD}
      submitHandling={submitMock}
      selectBest={selectBestMock}
      selectWorst={selectWorstMock}
      best={1}
      worst={2}
    />
  );
  expect(asFragment()).toMatchSnapshot();
  expect(getByLabelText("Option A is best")).not.toHaveAttribute("disabled");
  expect(getByLabelText("Option B is best")).toHaveAttribute("disabled");
  expect(getByLabelText("Option C is best")).toHaveAttribute("disabled");
  expect(getByLabelText("Option D is best")).toHaveAttribute("disabled");
  expect(getByLabelText("Option A is worst")).toHaveAttribute("disabled");
  expect(getByLabelText("Option B is worst")).not.toHaveAttribute("disabled");
  expect(getByLabelText("Option C is worst")).toHaveAttribute("disabled");
  expect(getByLabelText("Option D is worst")).toHaveAttribute("disabled");
});

test("best=3, worst=4 matches snapshot", () => {
  const selectBestMock = jest.fn();
  const selectWorstMock = jest.fn();
  const submitMock = jest.fn();
  const { asFragment, getByLabelText } = render(
    <Question
      submissionError={false}
      questionNumber={1}
      scenarioText={SampleQuestionText.scenarioText}
      optTextA={SampleQuestionText.optTextA}
      optTextB={SampleQuestionText.optTextB}
      optTextC={SampleQuestionText.optTextC}
      optTextD={SampleQuestionText.optTextD}
      submitHandling={submitMock}
      selectBest={selectBestMock}
      selectWorst={selectWorstMock}
      best={3}
      worst={4}
    />
  );
  expect(asFragment()).toMatchSnapshot();
  expect(getByLabelText("Option A is best")).toHaveAttribute("disabled");
  expect(getByLabelText("Option B is best")).toHaveAttribute("disabled");
  expect(getByLabelText("Option C is best")).not.toHaveAttribute("disabled");
  expect(getByLabelText("Option D is best")).toHaveAttribute("disabled");
  expect(getByLabelText("Option A is worst")).toHaveAttribute("disabled");
  expect(getByLabelText("Option B is worst")).toHaveAttribute("disabled");
  expect(getByLabelText("Option C is worst")).toHaveAttribute("disabled");
  expect(getByLabelText("Option D is worst")).not.toHaveAttribute("disabled");
});
