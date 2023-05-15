import { Card } from 'react-bootstrap';

function ResultBGP({title, start, consensus}) {
  return (
    <Card style={{ width: '28rem' }} className='mx-auto shadow'>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        { start ? <Card.Text>
          {consensus}
        </Card.Text> : <Card.Text>
          No Result
        </Card.Text>}
    
      </Card.Body>
    </Card>

  );
}

export default ResultBGP;