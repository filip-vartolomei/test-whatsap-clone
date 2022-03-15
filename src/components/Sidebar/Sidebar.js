import { observer } from 'mobx-react-lite';
import { useStores } from '../../StoresProvider';
import UserMessages from '../Messages/UserMessages.js';
import ContactsList from '../ContactsList/ContactsList';

function SideBar() {
  const { contactsStore } = useStores();
  const { showContacts } = contactsStore;

  return (
    <div className="w-1/3 border flex flex-col">
      {showContacts ? (
        <>
          <ContactsList />
        </>
      ) : (
        <>
          <UserMessages />
        </>
      )}
    </div>
  );
}

export default observer(SideBar);
