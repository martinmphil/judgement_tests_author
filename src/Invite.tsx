import React, { useState } from "react";
import { backend } from "./ConfigAssessor";
import ExamPicker from "./ExamPicker";
import csv from "csvtojson"; // npmjs.com/package/csvtojson

interface Props {
  authorization: string;
}

const Assessor: React.FC<Props> = (props) => {
  const [examId, setExamId] = useState(0);
  const [singleName, setSingleName] = useState("");
  const [singleEmail, setSingleEmail] = useState("");
  const [singleSent, setSingleSent] = useState(false);
  const [errorSingleInvite, setErrorSingleInvite] = useState(false);
  const [errorBatchInvite, setErrorBatchInvite] = useState(false);
  const [isBatchInviting, setIsBatchInviting] = useState(false);
  const [batchSent, setBatchSent] = useState(false);
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

  const readCsv = (event: any) => {
    event.preventDefault();

    const reader = new FileReader();

    reader.readAsText(event.target.files[0]);

    reader.onload = function(e) {
      if (e.target) {
        let x = e.target.result?.toString();

        if (x) {
          csv({
            noheader: true,
            output: "csv",
          })
            .fromString(x)
            .then((csvRow) => {
              const data = csvRow.map((y) => {
                return { email: y[2], name: `${y[1]} ${y[0]}` };
              });
              setBatchInvitees(data);
            });
        }
      }
    };
  };

  const batchInvite = () => {
    if (examId > 0 && batchInvitees[0].email.length > 1) {
      setIsBatchInviting(true);
      fetch(`${backend}candidates/send-invite-email/${examId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: props.authorization,
        },
        body: JSON.stringify(batchInvitees),
      })
        .then((response) => {
          setIsBatchInviting(false);
          if (!response.ok) {
            setErrorBatchInvite(true);
            console.log(response.json());
          } else {
            setBatchSent(true);
          }
        })
        .catch((error) => {
          setIsBatchInviting(false);
          setErrorBatchInvite(true);
          console.error("Error:", error);
        });
    } else {
      setIsBatchInviting(false);
      setErrorBatchInvite(true);
    }
  };

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
        <form>
          <h3>Batch invitees for exam number {examId}</h3>
          <fieldset>
            <legend>
              Please create a{" "}
              <a href="https://en.wikipedia.org/wiki/Comma-separated_values">
                .csv
              </a>{" "}
              file with three columns containing only the data for surname,
              firstname and email.
            </legend>
            <label htmlFor="invitees">
              Press the button below to select your .csv file.
            </label>{" "}
            <br />
            <input
              type="file"
              id="invitees"
              name="invitees"
              accept=".csv"
              onChange={(event) => readCsv(event)}
            ></input>
          </fieldset>
        </form>
      )}

      {errorBatchInvite && (
        <p className="error-warning">
          Sorry we experienced an error sending a batch invite for exam number{" "}
          {examId}.
        </p>
      )}

      {isBatchInviting && (
        <p className="success-message">
          Please wait. Sending your batch invite...
        </p>
      )}

      {batchSent && (
        <p className="success-message">
          Your batch invite for exam number {examId} has been sent.
        </p>
      )}

      {batchInvitees[0].email.length > 1 && (
        <div>
          <p>
            <button type="button" onClick={batchInvite}>
              Invite
            </button>{" "}
            the following people to exam number {examId}
          </p>

          <table>
            <caption>Batch invitees</caption>
            <tbody>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">E-mail</th>
              </tr>
              {batchInvitees.map((x) => {
                return (
                  <tr key={x.email}>
                    <td>{x.name}</td>
                    <td>{x.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default Assessor;
