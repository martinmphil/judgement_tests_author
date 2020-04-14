import React, { useState } from "react";
import { backend } from "./ConfigAssessor";
import ExamPicker from "./ExamPicker";

interface Props {
  authorization: string;
}

const Assessor: React.FC<Props> = (props) => {
  const [examId, setExamId] = useState(0);
  const [singleName, setSingleName] = useState("");
  const [singleEmail, setSingleEmail] = useState("");
  const [singleSent, setSingleSent] = useState(false);
  const [errorSingleInvite, setErrorSingleInvite] = useState(false);
  const [batchInvitees, setBatchInvitees] = useState([
    {
      email: "",
      name: "",
    },
  ]);

  const changeName = (event: { target: { value: any } }) => {
    setSingleName(event.target.value);
  };

  const changeEmail = (event: { target: { value: any } }) => {
    setSingleEmail(event.target.value);
  };

  const changeInvitees = (event: { target: { value: any } }) => {
    setBatchInvitees(event.target.value);
  };

  const singleInvite = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (examId > 0 && singleName.length > 0 && singleEmail.length > 0) {
      fetch(`${backend}candidates/send-invite-email/${examId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: props.authorization,
        },
        body: JSON.stringify([
          {
            email: singleEmail,
            name: singleName,
          },
        ]),
      })
        .then((response) => {
          if (!response.ok) {
            setErrorSingleInvite(true);
            console.log(response.json());
          } else {
            setSingleSent(true);
          }
        })
        .catch((error) => {
          setErrorSingleInvite(true);
          console.error("Error:", error);
        });
    } else {
      setErrorSingleInvite(true);
    }
  };

  const batchInvite = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const csvStr = `a,b,c
    1,2,3
    4,5,6
    7,8,9`;
    const csv = require("csvtojson");
    csv()
      .fromString(csvStr)
      .then((jsonObj: any) => {
        console.log(jsonObj);
      });
  };

  //
  // csv

  // const csvFilePath = "TESTcsv.csv";

  // const jsonArray=await csv().fromFile(csvFilePath);

  //
  //

  return (
    <main>
      <h1>Invite</h1>
      <ExamPicker setExamId={setExamId} authorization={props.authorization} />

      {errorSingleInvite && (
        <p className="error-warning">
          Sorry we experienced an error sending a single invite to "{singleName}
          " for exam number {examId}.
        </p>
      )}

      {examId > 0 && <h2>Exam number {examId}</h2>}

      {examId > 0 && (
        <form onSubmit={singleInvite}>
          <h3>Single invitee for exam number {examId}</h3>
          <fieldset>
            <legend>Please enter name and email</legend>
            <label htmlFor="name">Candidate name:- </label>
            <input
              value={singleName}
              onChange={changeName}
              type="text"
              id="name"
              name="name"
            ></input>
            <br />
            <label htmlFor="email">Candidate email:- </label>
            <input
              value={singleEmail}
              onChange={changeEmail}
              type="email"
              id="email"
              name="email"
            ></input>
            <div>
              <button type="submit">Send</button>
              <span>single invite to:- {singleName}</span>
            </div>
          </fieldset>
        </form>
      )}

      {singleSent && (
        <p className="success-message">
          Your invite to "{singleName}" for exam number {examId} has been sent.
        </p>
      )}

      {examId > 0 && (
        <form onSubmit={batchInvite}>
          <h3>Batch invitees for exam number {examId}</h3>
          <fieldset>
            <legend>
              Please create a{" "}
              <a href="https://en.wikipedia.org/wiki/Comma-separated_values">
                .csv
              </a>{" "}
              file containing data only under three column headings "lastname",
              "firstname" and "email".
            </legend>
            <label htmlFor="invitees">
              Select your .csv file, then press submit.
            </label>{" "}
            <br />
            <input
              type="file"
              id="invitees"
              name="invitees"
              accept=".csv"
            ></input>
            <button type="submit">Submit</button>
          </fieldset>
        </form>
      )}

      {/* TO REMOVE */}

      {console.log(batchInvitees)}

      {/* TO REMOVE */}
    </main>
  );
};

export default Assessor;
