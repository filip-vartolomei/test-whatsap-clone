import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../StoresProvider';
import Contact from './Contact';
import GroupCreator from './GroupCreator';
import SearchInput from '../common/SearchInput';

function ContactsList(props) {
  const { contactsStore } = useStores();

  useEffect(() => {
    contactsStore.fetchContacts();
  }, []);

  const {
    filteredContacts,
    search,
    setSearch,
    showGroupCreation,
    addUserToGroup,
    toggleContactsView,
    createMessage,
  } = contactsStore;

  const handleContactClick = (user) => {
    if (showGroupCreation) {
      addUserToGroup(user);
    } else {
      createMessage(user);
      toggleContactsView();
    }
  };

  return (
    <>
      <header
        className="flex justify-start pb-4 items-end text-white"
        style={{ height: '104px', backgroundColor: '#008069' }}
      >
        <div className="flex px-3 mx-2 cursor-pointer" onClick={() => toggleContactsView()}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="currentColor"
              d="m12 4 1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"
            ></path>
          </svg>
        </div>
        <div className="px-3">
          <p className="text-xl">New Chat</p>
        </div>
      </header>

      <div className="bg-grey-lighter flex-1 overflow-auto">
        <GroupCreator />
        <SearchInput value={search} onInputChange={(value) => setSearch(value)} />
        {filteredContacts.map((contact) => (
          <Contact key={contact.id} contact={contact} onContactClick={handleContactClick} />
        ))}
      </div>
    </>
  );
}

export default observer(ContactsList);
