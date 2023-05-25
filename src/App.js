import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarBGP from "./components/navbar";
import GeneralBGP from "./components/general";
import ResultCard from "./components/result";
import StepCard from "./components/step";
import InputNumber from "./components/inputNumber";
import axios from "axios";

function App() {
  const [numberOfGeneral, setNumberOfGeneral] = useState(3);
  const [generalTypes, setGeneralTypes] = useState(["l", "l", "l"]);
  const [command, setCommand] = useState("Attack");
  const [start, setStart] = useState(false);
  const [load, setLoad] = useState(false);
  const [consensus, setConsensus] = useState();
  const [actions, setActions] = useState({});
  const [numberLoyalGeneral, setnumberLoyalGeneral] = useState(0);
  const [logs, setLogs] = useState();
  const [step, setStep] = useState(0);

  const renderGeneralInput = () => {
    const generals = [];

    for (let i = 0; i < numberOfGeneral; i++) {
      let generalLogs;
      if (logs) {
        let logId;
        if (i === 0) {
          logId = "SupremeGeneral";
        } else {
          logId = `General${i}`;
        }
        generalLogs = logs.filter(
          (log) => log.node === logId && log.step <= step
        );
      } else {
        generalLogs = [];
      }

      generals.push(
        <GeneralBGP
          setCommand={setCommand}
          isSupreme={i === 0 ? true : false}
          start={start}
          load={load}
          idGeneral={i}
          changeType={changeType}
          logs={generalLogs}
          step={step}
        />
      );
    }

    return generals;
  };

  const changeNumberOfGeneral = (e) => {
    let types = [];

    const newNumber = parseInt(e.value);

    for (let i = 0; i < newNumber && i < numberOfGeneral; i++) {
      types.push(generalTypes[i]);
    }

    if (newNumber > numberOfGeneral) {
      const diff = newNumber - numberOfGeneral;
      for (let i = 0; i < diff; i++) {
        types.push("l");
      }
    }

    console.log(types);
    setNumberOfGeneral(newNumber);
    setGeneralTypes(types);
  };

  const changeStep = (type) => {
    if (type === "next" && step < 8) {
      setStep(step + 1);
    } else if (type === "prev" && step > 1) {
      setStep(step - 1);
    } else if (type === "reset") {
      setStep(0);
    }
  };

  const changeType = (id, type) => {
    const temp = [...generalTypes];

    if (type.toLowerCase() === "loyal") {
      temp[id] = "l";
    } else if (type.toLowerCase() === "traitor") {
      temp[id] = "t";
    }
    setGeneralTypes(temp);
  };

  const processResult = (generalConsensus, generalsAction) => {
    setConsensus(generalConsensus);

    let actionsList = {};
    for (let action of generalsAction) {
      let generalId = action.split(":")[0].split(" ")[1];
      if (generalId === "General") {
        generalId = 0;
      } else {
        generalId = parseInt(generalId);
      }
      actionsList[generalId] = action;
    }

    setActions(actionsList);
  };

  const runSimulator = async () => {
    const commandArg = command.toLowerCase();
    const generalTypesArg = generalTypes.join("");
    console.log(
      `Call: ${process.env.REACT_APP_BACKEND_API_URL}/run/${commandArg}/${generalTypesArg}`
    );
    const loyalGenerals = generalTypes.filter((value) => value === "l").length;
    setnumberLoyalGeneral(loyalGenerals);
    setLoad(true);
    setStart(true);

    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_API_URL}/run/${commandArg}/${generalTypesArg}`
      )
      .then(
        (res) => {
          console.log("Simulator Success");
          console.log(res.data);

          setLogs(res.data.logs);
          processResult(res.data.general_consensus, res.data.generals_action);

          setLoad(false);
          changeStep("next");
        },
        (err) => {
          console.log("Simulator Failed");
          console.log(err);

          setStart(false);
          setLoad(false);

          alert("Failed to run simulator!")
        }
      );
  };

  return (
    <div className="App">
      <NavbarBGP />

      <div className="content d-flex flex-column flex-xl-row w-100">
        <div id="main-content" className="w-100 mb-4 me-lg-5">
          <div className="p-5 shadow content-card">
            <InputNumber
              start={start}
              setStart={setStart}
              load={load}
              changeNumberOfGeneral={changeNumberOfGeneral}
              runSimulator={runSimulator}
              step={step}
              changeStep={changeStep}
            />
            {renderGeneralInput()}
          </div>
        </div>

        <div id="aside" className="w-100 d-flex flex-column flex-md-row flex-xl-column">
          <StepCard start={start} load={load} step={step} logs={logs} />
          <ResultCard
            start={start}
            load={load}
            step={step}
            consensus={consensus}
            actions={actions}
            numberLoyalGeneral={numberLoyalGeneral}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
