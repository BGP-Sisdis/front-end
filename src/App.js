import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarBGP from "./components/navbar";
import GeneralBGP from "./components/general";
import ResultBGP from "./components/result";
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
        generalLogs = logs[logId];
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

  const changeType = (id, type) => {
    const temp = [...generalTypes];

    if (type.toLowerCase() === "loyal") {
      temp[id] = "l";
    } else if (type.toLowerCase() === "traitor") {
      temp[id] = "t";
    }
    setGeneralTypes(temp);
  };

  const processLogs = (rawLogs) => {
    const processedLogs = {};

    for (let log of rawLogs) {
      if (!processedLogs[log[1]]) {
        processedLogs[log[1]] = [];
      } else {
        processedLogs[log[1]].push(`${log[0]} - ${log[2]}`);
      }
    }
    setLogs(processedLogs);
    console.log(logs);
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

          processLogs(res.data.logs);
          processResult(res.data.general_consensus, res.data.generals_action);

          setLoad(false);
        },
        (err) => {
          console.log("Simulator Failed");
          console.log(err);

          setLoad(false);
        }
      );
  };

  return (
    <div className="App">
      <NavbarBGP />
      <div className="content d-flex flex-column flex-lg-row w-100">
        <div className="w-75">
          <div className="me-5 p-5 shadow content-card">
            <InputNumber
              start={start}
              setStart={setStart}
              setLogs={setLogs}
              changeNumberOfGeneral={changeNumberOfGeneral}
              runSimulator={runSimulator}
            />
            {renderGeneralInput()}
          </div>
        </div>
        <div className="w-25">
          <div className="p-5 shadow content-card">
            <ResultBGP
              title="Result"
              start={start}
              load={load}
              consensus={consensus}
              actions={actions}
              numberLoyalGeneral={numberLoyalGeneral}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
