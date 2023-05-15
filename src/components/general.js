import {  Button, Row, Col, Container } from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ResultBGP from './result'

function GeneralBGP({isSupreme, start, idGeneral}) {
    const typeOptions = [
        'Loyal', 'Traitor'
      ];

      const commandOptions = [
        'Attack', 'Retreat'
      ];
      
  return (
<Container>
    <Row className='py-3 px-2 ms-5 mb-5 shadow'>
        <Col>
        { isSupreme ? <p>Supreme General</p>:<p>General {idGeneral}</p>}
        </Col >
        <Col >
            <Dropdown options={typeOptions}  value={typeOptions[0]} placeholder="Select an option" />
        </Col>
        { isSupreme  &&  <><Col>
            <p>Command</p>
        </Col>
        <Col>
            <Dropdown options={commandOptions}  value={commandOptions[0]} placeholder="Select an option" />
        </Col> </>}
         <Col>
         <Popup trigger={ start ? <Button variant="secondary" >See Logs</Button> : <></>} position="right center" ><ResultBGP title="Log General" start={start}/></Popup>
         
        </Col> 
    </Row>
    </Container>

  );
}

export default GeneralBGP;