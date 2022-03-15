import React from 'react';
import { MessagesStore } from './stores/MessagesStore';
import { ChatStore } from './stores/ChatStore';
import { ContactsStore } from './stores/ContactsStore';
import { UiStore } from './stores/UiStore';

const StoresContext = React.createContext({});

export const StoresProvider = ({ children }) => {
  const chatStore = new ChatStore();
  const uiStore = new UiStore();
  const messagesStore = new MessagesStore(chatStore, uiStore);
  const contactsStore = new ContactsStore(messagesStore);

  return (
    <StoresContext.Provider value={{ chatStore, messagesStore, contactsStore, uiStore }}>
      {children}
    </StoresContext.Provider>
  );
};

// this hook will be used in the entire app to connect to the store
export const useStores = () => React.useContext(StoresContext);
