import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createGateWays } from '../../store/features/gateways/gateways';
import { RootState } from '../../store/store';
import axios from 'axios';
import configAxios from '../../axios/configAxios';
import { API } from '../../axios/endpoint';
import CardRoom from '../../components/cards/CardRoom';

function CreateGate() {
  const createGate = useSelector(
    (state: RootState) => state.gateways.createGate
  );
  const dispatch = useDispatch();

  const [topic, setTopic] = useState();
  const [name, setName] = useState();

  const onSubmit = async () => {
    try {
      const data = {
        topic: topic,
        name: name,
      };
      const res = await axios(configAxios('post', API.createGate, data));
      dispatch(createGateWays(res.data));
      localStorage.setItem('accessTokenCreate', res.data.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h3>CreateGate</h3>
      <div className='d-flex justify-content-end mx-1'>
        {/* <Button
          onClick={() => {
            localStorage.setItem('accessToken', '');
          }}
          variant='danger'
        >
          ออกจากห้อง
        </Button> */}
      </div>
      <Form>
        <Form.Group className='mb-3' controlId='formTopic'>
          <Form.Label>Topic</Form.Label>
          <Form.Control
            // disabled={isCreateRoom ? true : false}
            onChange={(event: any) => {
              setTopic(event.target.value);
            }}
            type='text'
            placeholder='Topic is ...'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formName'>
          <Form.Label>ชื่อผู้ใช้งาน</Form.Label>
          <Form.Control
            // disabled={isCreateRoom ? true : false}
            onChange={(event: any) => {
              setName(event.target.value);
            }}
            type='text'
            placeholder='Name user is ...'
          />
        </Form.Group>

        <div className='d-flex justify-content-center'>
          <Button
            onClick={(event) => {
              event.preventDefault();

              if (topic && name) onSubmit();
            }}
            variant='primary'
            type='submit'
          >
            สร้างห้องแชท
          </Button>
        </div>
      </Form>

      {createGate?.accessToken && (
        <>
          <CardRoom
            gateID={createGate.gate.id}
            topic={createGate.gate.topic}
          ></CardRoom>
        </>
      )}
      <></>
    </>
  );
}

export default CreateGate;
