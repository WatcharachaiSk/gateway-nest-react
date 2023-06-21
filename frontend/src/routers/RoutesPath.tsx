import { Routes, Route } from 'react-router-dom';
import CreateGate from '../pages/createGate/CreateGate';
import JoinGate from '../pages/joinGate/JoinGate';
import pathRoutesPage from './pathPage';
import Chat from '../pages/chat/Chat';

function RoutesPath() {
  return (
    <>
      <Routes>
        <Route path='/' element={<CreateGate />} />
        <Route path={pathRoutesPage.createGate} element={<CreateGate />} />
        <Route path={pathRoutesPage.joinGate} element={<JoinGate />} />
        <Route path={pathRoutesPage.chat} element={<Chat />} />
      </Routes>
    </>
  );
}

export default RoutesPath;
