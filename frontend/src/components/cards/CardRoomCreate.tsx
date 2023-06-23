import { Button, Card } from 'react-bootstrap';

function CardRoomCreate(props: {
  title: string;
  topic: string;
  gateID: string;
  onClickButton: any;
}) {
  const clickIs = () => {
    props.onClickButton(true);
  };
  return (
    <>
      <div className='d-flex justify-content-center mt-5'>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>
              <span>รหัสห้อง: {props.gateID}</span>
              <br />
              <span>Topic: {props.topic}</span>
            </Card.Text>
          </Card.Body>
          <Button
            onClick={() => {
              clickIs();
            }}
          >
            เข้าร่วมแชท
          </Button>
        </Card>
      </div>
    </>
  );
}

export default CardRoomCreate;
