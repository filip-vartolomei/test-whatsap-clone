import { observer } from 'mobx-react-lite';
import { useStores } from '../../StoresProvider';

import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessageList from './ChatMessageList';
import ChatEmpty from './ChatEmpty';

function ChatContainer() {
  const { chatStore } = useStores();
  const { chat } = chatStore;

  return (
    <div className="w-2/3 border flex flex-col">
      {chat ? (
        <>
          <ChatHeader />
          <ChatMessageList />
          <ChatInput />
        </>
      ) : (
        <ChatEmpty />
      )}
    </div>
  );
}

export default observer(ChatContainer);
