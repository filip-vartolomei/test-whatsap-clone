import { observer } from 'mobx-react-lite';
import { useStores } from '../../StoresProvider';
import ChatDateInfo from './ChatDateInfo';
import ChatMessageInfo from './ChatMessageInfo';
import ChatEncryptionInfo from './ChatEncryptionInfo';
import ChatMessage from './ChatMessage';
import { MESSAGE_TYPE } from '../../utils';

function ChatMessageList() {
  const { chatStore, uiStore } = useStores();
  const { chat } = chatStore;
  const { user } = uiStore;

  return (
    <div className="flex-1 overflow-auto" style={{ backgroundColor: '#DAD3CC' }}>
      <div className="py-2 px-3">
        {chat.messages.map((message, index) => (
          <div key={index}>
            {message.type === MESSAGE_TYPE.message && (
              <ChatMessage message={message} currentUserId={user.id} />
            )}
            {message.type === MESSAGE_TYPE.chatDate && <ChatDateInfo date={message.modifiedAt} />}
            {message.type === MESSAGE_TYPE.encryption && <ChatEncryptionInfo />}
            {message.type === MESSAGE_TYPE.messageInfo && <ChatMessageInfo text={message.text} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default observer(ChatMessageList);
