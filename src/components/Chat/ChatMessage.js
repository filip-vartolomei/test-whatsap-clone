import dayjs from 'dayjs';

function ChatMessage({ message, currentUserId }) {
  const isCurrentUser = currentUserId === message.sender;
  const timeFormatted = dayjs(message.modifiedAt).format('HH:mm');

  return (
    <div className={`flex mb-2 ${isCurrentUser && 'justify-end'}`}>
      <div
        className="rounded py-2 px-3"
        style={{ backgroundColor: isCurrentUser ? '#E2F7CB' : '#F2F2F2' }}
      >
        {!isCurrentUser && (
          <p className="text-sm text-teal font-semibold" style={{ color: message.color }}>
            {message.userName}
          </p>
        )}
        <p className="text-sm mt-1">{message.text}</p>
        <p className="text-right text-xs text-grey-dark mt-1">{timeFormatted}</p>
      </div>
    </div>
  );
}

export default ChatMessage;
