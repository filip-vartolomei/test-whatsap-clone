import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../StoresProvider';
import Header from '../Sidebar/SidebarHeader';
import SearchInput from '../common/SearchInput';
import ChatUserImage from '../Chat/ChatUserImage';

function UserMessages() {
  const { messagesStore, chatStore } = useStores();
  const { search, setSearch, orderedMessages } = messagesStore;
  const { chat, setChat } = chatStore;

  return (
    <>
      <Header />
      <SearchInput value={search} onInputChange={(value) => setSearch(value)} />
      <div className="bg-grey-lighter flex-1 overflow-auto">
        {orderedMessages.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => setChat(item)}
              className={`px-3 flex items-center cursor-pointer ${
                item.id === (chat && chat.id) ? 'bg-grey-light' : 'bg-white hover:bg-grey-lighter'
              }`}
            >
              <ChatUserImage imgSrc={!item.isGroup && item.user.imgSrc} isGroup={item.isGroup} />

              <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                <div className="flex items-baseline justify-between">
                  <p className="text-grey-darkest">
                    {item.isGroup ? item.groupName : item.user.userName}
                  </p>
                  <p className="text-xs text-grey-darkest">
                    {dayjs(item.modifiedAt).calendar(dayjs())}
                  </p>
                </div>
                <p className="text-grey-dark mt-1 text-sm">
                  {item.messages[item.messages.length - 1].text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default observer(UserMessages);
