// import React from 'react'
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import configAxios from '../../axios/configAxios';
import { API } from '../../axios/endpoint';
import { useDispatch, useSelector } from 'react-redux';
import { joinGateWays } from '../../store/features/gateways/gateways';
import { RootState } from '../../store/store';
import CardRoom from '../../components/cards/CardRoom';

function JoinGate() {
  const joinGate = useSelector((state: RootState) => state.gateways.joinGate);
  const dispatch = useDispatch();
  const [gateID, setGateID] = useState();
  const [name, setName] = useState();

  const onSubmit = async () => {
    try {
      const data = {
        gateID: gateID,
        name: name,
      };
      const res = await axios(configAxios('post', API.joinGate, data));
      dispatch(joinGateWays(res.data));
      localStorage.setItem('accessTokenJoin', res.data.accessToken);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h3>JoinGate</h3>
      <Form>
        <Form.Group className='mb-3' controlId='formTopic'>
          <Form.Label>รหัสห้อง</Form.Label>
          <Form.Control
            // disabled={isCreateRoom ? true : false}
            onChange={(event: any) => {
              setGateID(event.target.value);
            }}
            type='text'
            placeholder='gate ID is ...'
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

              if (gateID && name) onSubmit();
            }}
            variant='primary'
            type='submit'
          >
            เข้าร่วมห้องแชท
          </Button>
        </div>
      </Form>

      {joinGate.accessToken && (
        <>
          <CardRoom gateID={joinGate.gateID} topic={joinGate.topic}></CardRoom>{' '}
        </>
      )}
    </>
  );
}

export default JoinGate;
