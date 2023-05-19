import { Button, Container } from "react-bootstrap";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function InputNumber({ start, setStart, load, changeNumberOfGeneral, runSimulator, step, changeStep }) {
  const options = Array.from({ length: 28 }, (v, k) => String(k + 3));

  const startBgp = async () => {
    runSimulator();
  };

  const restartBgp = () => {
    changeStep("reset")
    setStart(false);
  };

  return (
    <Container className="mb-5 w-100">
      <div className="d-flex flex-column flex-md-row align-items-center">
        <div className="w-25">
          <strong>Number of General:</strong>
        </div>
        <div className="w-25">
          <Dropdown
            disabled={start}
            options={options}
            onChange={(e) => changeNumberOfGeneral(e)}
            value={options[0]}
            placeholder="Select an option"
          />
        </div>
        <div className="ms-auto w-50 d-flex flex-row justify-content-end">
          {start && !load ? (
            <>
              <Button
                className="mx-2"
                variant="primary"
                size="lg"
                onClick={(e) => changeStep("prev")}
                disabled={step < 2 ? true: false}
              >
                Prev
              </Button>
              <Button
                className="mx-2"
                variant="primary"
                size="lg"
                onClick={(e) => changeStep("next")}
                disabled={step > 7 ? true: false}
              >
                Next
              </Button>
            </>
          ) : (
            ""
          )}
          <Button
            className="mx-2"
            variant="primary"
            size="lg"
            onClick={start ? restartBgp : startBgp}
          >
            {start ? "Restart" : "Start"}
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default InputNumber;
