import dayjs from 'dayjs';
import { action, computed, makeAutoObservable, observable } from 'mobx';
import chatService from '../services/ChatService';

export class MessagesStore {
  search = '';
  userChats = [];

  constructor(chatStore, uiStore) {
    this.chatStore = chatStore;
    this.uiStore = uiStore;

    makeAutoObservable(this, {
      search: observable,
      userChats: observable,
      sendMessage: action.bound,
      setSearch: action.bound,
      orderedMessages: computed,
    });

    this.userChats = chatService.getMessages();
  }

  setSearch(newValue) {
    this.search = newValue;
  }

  get orderedMessages() {
    let data = [...this.userChats];
    if (this.search) {
      data = data.filter((chat) => {
        const searchLowered = this.search.toLowerCase();

        return chat.isGroup
          ? chat.groupName.toLowerCase().includes(searchLowered)
          : chat.user.userName.toLowerCase().includes(searchLowered);
      });
    }

    // order by date modifiedAt
    return data
      .slice()
      .sort((chat1, chat2) => dayjs(chat2.modifiedAt).diff(dayjs(chat1.modifiedAt)));
  }

  createGroup(data) {
    const fakeApiCallData = chatService.createGroup(data);
    this.userChats.push(fakeApiCallData);
    this.chatStore.setChat(fakeApiCallData);

    chatService.saveMessages(this.userChats);
  }

  createChat(user) {
    const findUserExistent = this.userChats.findIndex(
      (item) => item.user && item.user.id === user.id,
    );

    if (findUserExistent > -1) {
      // open existing chat
      this.chatStore.setChat(this.userChats[findUserExistent]);
    } else {
      // set a new chat
      const data = chatService.createChatTemp(user);
      this.chatStore.setChat(data);
    }
  }

  sendMessage(newMessage) {
    if (!this.chatStore.chat.id) {
      // it's a new chat not yet saved, until now
      const newChat = chatService.createChat(this.chatStore.chat, newMessage);

      this.userChats.push(newChat);
      this.chatStore.setChat(newChat);
    } else {
      // existing chat, needs just to be updated
      const data = chatService.sendMessageExistingChat(
        this.userChats,
        this.chatStore.chat,
        newMessage,
      );

      this.userChats[data.index] = data.chat;
      this.chatStore.setChat(data.chat);
    }

    chatService.saveMessages(this.userChats);

    // CREATING A FAKE RESPONSE, by triggering an ACTION
    if (newMessage.sender === this.uiStore.user.id) {
      setTimeout(() => this.receiveMessage(), 500);
    }
  }

  receiveMessage() {
    const data = chatService.receiveMessage(this.userChats, this.chatStore.chat);
    // chatService.receiveMessage will output an updated chat message with an index
    this.userChats[data.index] = data.currentChat;
    this.chatStore.setChat(this.userChats[data.index]);

    chatService.saveMessages(this.userChats);
  }
}
