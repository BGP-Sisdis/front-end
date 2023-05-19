import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Modal from "react-bootstrap/Modal";
import "reactjs-popup/dist/index.css";

function GeneralBGP({
  setCommand,
  isSupreme,
  start,
  load,
  idGeneral,
  changeType,
  logs,
  step,
}) {
  const typeOptions = ["Loyal", "Traitor"];
  const commandOptions = ["Attack", "Retreat"];
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeCommand = (e) => {
    setCommand(e.value);
  };

  return (
    <Container>
      <div className="py-2 px-1 my-4 d-flex flex-column flex-md-row align-items-center shadow-sm general-card">
        <div className="general-name-sec">
          {isSupreme ? <p className="m-0">Supreme General</p> : <p className="m-0">General {idGeneral}</p>}
        </div>
        <div className="general-type-sec">
          <Dropdown
            disabled={start}
            options={typeOptions}
            value={typeOptions[0]}
            placeholder="Select an option"
            onChange={(e) => changeType(idGeneral, e.value)}
          />
        </div>
        {isSupreme && (
          <>
            <div className="command-sec">
              <p className="m-0">Command</p>
            </div>
            <div className="command-select-sec">
              <Dropdown
                disabled={start}
                options={commandOptions}
                value={commandOptions[0]}
                placeholder="Select an option"
                onChange={(e) => changeCommand(e)}
              />
            </div>{" "}
          </>
        )}
        <div className="log-btn-sec">
          {start && !load ? (
            <Button variant="primary" onClick={handleShow}>
              See Logs
            </Button>
          ) : (
            <></>
          )}

          <Modal
            show={show}
            onHide={handleClose}
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
            size="lg"
            scrollable
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Log {isSupreme ? "Supreme General" : `General ${idGeneral}`}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ul>
                {start && !load ? logs.map((log, index) => {
                  return <li key={`log-${index}`}>{log["message"]}</li>;
                }) : ""}
              </ul>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </Container>
  );
}

export default GeneralBGP;
