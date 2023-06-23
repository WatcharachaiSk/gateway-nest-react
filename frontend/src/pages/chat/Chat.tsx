import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CardRoomCreate from '../../components/cards/CardRoomCreate';
import { useEffect, useState } from 'react';
import MyChat from './MyChat';

function Chat() {
  const createGate = useSelector(
    (state: RootState) => state.gateways.createGate
  );
  const joinGate = useSelector((state: RootState) => state.gateways.joinGate);

  const [onMyChat, setOnMyChat] = useState(false);
  const [onJoinChat, setOnJoinChat] = useState(false);

  console.log('onMyChat is ', onMyChat);
  console.log('onJoinChat is ', onJoinChat);

  const onClickMyChat = (isStatus: boolean) => {
    setOnMyChat(isStatus);
    if (isStatus == true) setOnJoinChat(false);
  };
  const onClickJoinChat = (isStatus: boolean) => {
    setOnJoinChat(isStatus);
    if (isStatus == true) setOnMyChat(false);
  };

  useEffect(() => {}, []);
  return (
    <>
      <h3>Chat</h3>
      <div className='d-flex justify-content-center'>
        {createGate.accessToken && (
          <div className='mx-1'>
            <CardRoomCreate
              onClickButton={onClickMyChat}
              title='ห้องที่คุณสร้าง'
              topic={createGate.gate.topic}
              gateID={createGate.gate.id}
            />
          </div>
        )}
        {joinGate.accessToken && (
          <div className='mx-1'>
            <CardRoomCreate
              onClickButton={onClickJoinChat}
              title='ห้องที่คุณเข้าร่วม'
              topic={joinGate.topic}
              gateID={joinGate.gateID}
            />
          </div>
        )}
      </div>

      <div>{onMyChat && <MyChat />}</div>
    </>
  );
}

export default Chat;
