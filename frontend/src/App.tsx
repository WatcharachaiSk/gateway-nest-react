import { useEffect, useState } from 'react';

import './App.css';
import io from 'socket.io-client';
import _ from 'lodash';

function App() {
  const [getMessage, setGetMessage] = useState([]);
  console.log('getMessage is ', getMessage);

  useEffect(() => {
    const socket = io('http://localhost:3000'); // Replace with your socket server URL

    socket.on('onMessage', (data: any) => {
      setGetMessage((prevMessages: any) => [...prevMessages, data]);
    });
    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <h1>Data Messages</h1>
      {getMessage.length > 0 && (
        <>
          {_.map(getMessage, (item: any, idx) => {
            return (
              <div>
                <li style={{ fontSize: 20 }}>{item?.content?.mgs}</li>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}

export default App;
