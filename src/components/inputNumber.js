import { Button, Container } from "react-bootstrap";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function InputNumber({ start, setStart, changeNumberOfGeneral, runSimulator }) {
  const options = Array.from({ length: 28 }, (v, k) => String(k+3));

  const startBgp = async () => {
    runSimulator();
  };

  const restartBgp = () => {
    setStart(false);
  };

  return (
    <Container className="mb-5 w-100">
      <div className="d-flex flex-column flex-md-row align-items-center">
        <div className="w-25"><strong>Number of General:</strong></div>
        <div className="w-25">
          <Dropdown
            disabled={start}
            options={options}
            onChange={(e) => changeNumberOfGeneral(e)}
            value={options[0]}
            placeholder="Select an option"
          />
        </div>
        <div className="ms-auto w-25">
          <Button
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
