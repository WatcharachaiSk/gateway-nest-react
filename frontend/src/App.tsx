// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';

// import { useEffect, useState } from 'react';

import './App.css';
import _ from 'lodash';
// import io from 'socket.io-client';
// import { Accordion, Button, Col, Form, Row } from 'react-bootstrap';
// import ChatMessage from './components/ChatMessage';
import RoutesPath from './routers/RoutesPath';
import SidebarApp from './components/sidebar/SidebarApp';

function App() {
  // const [getMessage, setGetMessage] = useState<any>([]);
  // const [username, setUsername] = useState<any>(
  //   localStorage.getItem('username')
  // );
  // const [sendMessage, setSendMessage] = useState('');
  // console.log('getMessage is ', getMessage);

  // useEffect(() => {
  // const socket = io('http://localhost:3000'); // Replace with your socket server URL
  // socket.on('onMessage', (data: any) => {
  //   setGetMessage((prevMessages: any) => [...prevMessages, data]);
  // });
  // // Clean up the socket connection when the component unmounts
  // return () => {
  //   socket.disconnect();
  // };
  // }, []);

  // const onSubmit = () => {
  // const socket = io('http://localhost:3000');
  // const setMessage = {
  //   msg: sendMessage,
  //   username: localStorage.getItem('username'),
  // };
  // socket.emit('newMessage', setMessage);
  // setSendMessage('');
  // };

  return (
    <>
      <div style={{ height: '100vh', display: 'flex' }}>
        <SidebarApp />
        <div style={{ width: '100%' }}>
          <RoutesPath />
        </div>
      </div>
    </>

    // <>
    //   {!username && (
    //     <Accordion>
    //       <Accordion.Item eventKey='0'>
    //         <Accordion.Header>
    //           <h4 style={{ color: 'red' }}>
    //             ยังไม่ได้ใส่ Username กรุณาใส่ก่อน
    //           </h4>
    //         </Accordion.Header>
    //         <Accordion.Body>....</Accordion.Body>
    //       </Accordion.Item>
    //     </Accordion>
    //   )}

    //   <h1>Messages</h1>
    //   <div>
    //     <div className='chat-container'>
    //       <div className='message-container'>
    //         {getMessage.length > 0 && (
    //           <>
    //             {_.map(getMessage, (item: any, idx) => {
    //               return (
    //                 <div key={idx}>
    //                   <ChatMessage
    //                     key={idx}
    //                     message={item?.content?.msg}
    //                     username={item.content.username}
    //                   />
    //                 </div>
    //               );
    //             })}
    //           </>
    //         )}
    //       </div>
    //       <Form>
    //         <div className='input-container'>
    //           <input
    //             type='text'
    //             placeholder='Type your message...'
    //             value={sendMessage}
    //             onChange={(event: any) => {
    //               setSendMessage(event.target.value);
    //             }}
    //           />
    //           <Button
    //             type='submit'
    //             onClick={(event) => {
    //               event.preventDefault();
    //               if (username) {
    //                 onSubmit();
    //               } else {
    //               }
    //             }}
    //           >
    //             Send
    //           </Button>
    //         </div>
    //       </Form>
    //     </div>
    //     <Form>
    //       <Row className='align-items-center'>
    //         <Col xs='auto'>
    //           <Form.Label htmlFor='inlineFormInput' visuallyHidden>
    //             Name
    //           </Form.Label>
    //           <Form.Control
    //             value={username}
    //             onChange={(event: any) => {
    //               setUsername(event.target.value);
    //               localStorage.setItem('username', event.target.value);
    //             }}
    //             className='mb-2'
    //             id='inlineFormInput'
    //             placeholder='Jane Doe'
    //           />
    //         </Col>

    //         <Col xs='auto'></Col>
    //       </Row>
    //     </Form>
    //   </div>
    // </>
  );
}

export default App;
