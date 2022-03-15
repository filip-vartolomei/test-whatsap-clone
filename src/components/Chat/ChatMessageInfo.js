function ChatMessageInfo({ text }) {
  return (
    <div className="flex justify-center mb-2">
      <div className="rounded py-2 px-4" style={{ backgroundColor: '#fff' }}>
        <p className="text-sm text-grey-dark">{text}</p>
      </div>
    </div>
  );
}

export default ChatMessageInfo;
