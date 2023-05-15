import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarBGP from './components/navbar'
import GeneralBGP from './components/general'
import ResultBGP from './components/result'
import InputNumber from './components/inputNumber'
import {  Row, Col } from 'react-bootstrap';

function App() {
  const [ numberOfGeneral, setNumberOfGeneral] = useState(3);
  const [ start, setStart] = useState(false);
  const [ consensus, setConsensus] = useState();
  const [ logs, setLogs] = useState();

  const renderGeneralInput = () => {
    const generals = [];
    for (var i = 0; i < numberOfGeneral; i++) {
      generals.push(<GeneralBGP isSupreme={i === 0 ? true:false} start = {start} idGeneral={i} />);
    }
    return generals
  }

  return (
    <div className="App">
      <NavbarBGP />
      <Row className='mt-5'>
        <Col>
          <InputNumber 
            setNumberOfGeneral={setNumberOfGeneral}
            start = {start}
            setStart = {setStart}
            setConsensus = {setConsensus}
            setLogs = {setLogs}
          />
          {renderGeneralInput()}
        </Col>
        <Col>
          <ResultBGP title="Result" start={start} consensus={consensus}/>
        </Col>
      </Row>
      
    </div>
  );
}

export default App;
