import { Button, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function InputNumber({setNumberOfGeneral, start, setStart, setConsensus}) {
    const options = Array.from({length: 28}, (v, k) => k+3);
    const startBgp = async () => {
        setStart(true)
        var res =  await axios.get(`http://localhost:8000/run/attack/lltll`);
        console.log("1",res)
        setConsensus(res.data.general_consensus)
        console.log("2",res.data)
    }

    const restartBgp = () => {
        setStart(false)
    }
  
  return (
    <Container className='mb-5'>
        <Row>
            <Col>
                Number of General: 
            </Col>
            <Col>
                <Dropdown disabled = {start} options={options} onChange={e => setNumberOfGeneral(e.value)} value={options[0]} placeholder="Select an option" />
            </Col>
            <Col>
                <Button variant="secondary" size="lg" onClick={start ? restartBgp:startBgp}>{start ? 'Restart':'Start'}</Button>
            </Col>
        </Row>
    </Container>

  );
}

export default InputNumber;