import { useEffect } from 'react';
import { io } from 'socket.io-client';
import baseURLGateways from '../../axios/baseURL.gateways';

function MyChat() {
  console.log('baseURLGateways is ', baseURLGateways);
  console.log(`Bearer ${localStorage.getItem('accessTokenCreate')}`);

  useEffect(() => {
    let token = `Bearer ${localStorage.getItem('accessTokenCreate')}`;
    const socket = io(baseURLGateways, {
      transports: ['websocket', 'gateways'],
      auth: {
        headers: {
          authorization: token,
        },
      },
    });

    socket.on('hello', (data: any) => {
      console.log('hello DATA is ', data);
    });
    socket.on('connectedClients', (data: any) => {
      console.log('connectedClients DATA is ', data);
    });
    socket.on('messages', (data: any) => {
      console.log('messages DATA is ', data);
    });

    

    // ดำเนินการอื่น ๆ ที่คุณต้องการกับการเชื่อมต่อ WebSocket นี้

    return () => {
      socket.disconnect(); // ตัดการเชื่อมต่อเมื่อ component unmounts
    };
  }, []);

  return (
    <>
      <div>MyChat</div>
    </>
  );
}

export default MyChat;
