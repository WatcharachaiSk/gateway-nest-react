import '../App.css';

const ChatMessage = ({ message, username }: any) => {
  return (
    <div className='chat-message'>
      <span className='username'>{username}: </span>
      {message}
    </div>
  );
};

export default ChatMessage;
