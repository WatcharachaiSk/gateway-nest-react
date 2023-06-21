import { Card } from 'react-bootstrap';

function CardRoom(props: { topic: string; gateID: string }) {
  return (
    <>
      <div className='d-flex justify-content-center mt-5'>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>รหัสห้อง {props.gateID}</Card.Title>
            <Card.Text>
              <p>Topic: {props.topic}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default CardRoom;
