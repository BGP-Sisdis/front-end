import { Button, Container } from "react-bootstrap";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function InputNumber({
  start,
  setStart,
  load,
  changeNumberOfGeneral,
  runSimulator,
  step,
  changeStep,
}) {
  const options = Array.from({ length: 28 }, (v, k) => String(k + 3));

  const startBgp = async () => {
    runSimulator();
  };

  const restartBgp = () => {
    changeStep("reset");
    setStart(false);
  };

  return (
    <Container className="mb-5 w-100">
      <div className="d-flex flex-column flex-md-row align-items-center">
        <div className="w-100 w-lg-50 mb-4 mb-md-0 d-flex flex-row align-items-center">
          <div className="w-50">
            <strong>Number of General:</strong>
          </div>
          <div className="w-50">
            <Dropdown
              disabled={start}
              options={options}
              onChange={(e) => changeNumberOfGeneral(e)}
              value={options[0]}
              placeholder="Select an option"
            />
          </div>
        </div>
        <div className="ms-auto w-100 w-lg-50 d-flex flex-warp flex-row justify-content-center justify-content-md-end">
          {start && !load ? (
            <>
              <Button
                className="me-1"
                variant="primary"
                size="lg"
                onClick={(e) => changeStep("prev")}
                disabled={step < 2 ? true : false}
              >
                Prev
              </Button>
              <Button
                className="mx-1"
                variant="primary"
                size="lg"
                onClick={(e) => changeStep("next")}
                disabled={step > 7 ? true : false}
              >
                Next
              </Button>

              <Button
                className="ms-1"
                variant="danger"
                size="lg"
                onClick={start ? restartBgp : startBgp}
              >
                Restart
              </Button>
            </>
          ) : (
            <Button
              className="mx-2"
              variant="primary"
              size="lg"
              onClick={start ? restartBgp : startBgp}
            >
              Start
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
}

export default InputNumber;
