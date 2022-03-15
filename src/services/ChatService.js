import { nanoid } from 'nanoid';
import dayjs from 'dayjs';

import contacts from '../data/contacts.json';
import { ls, getRandomColor, MESSAGE_TYPE } from '../utils';

class ChatService {
  getContacts() {
    return contacts;
  }

  getMessages() {
    const messages = ls.get('messages');
    if (messages) {
      return messages;
    }
    return [];
  }

  saveMessages(messages) {
    ls.set('messages', messages);
  }

  createGroup(data) {
    const messageGroupId = nanoid();
    const date = dayjs().format();

    data.id = messageGroupId;
    data.isGroup = true;
    data.modifiedAt = date;
    data.messages = [
      {
        type: MESSAGE_TYPE.chatDate, // Data de creare
        modifiedAt: date,
      },
      {
        type: MESSAGE_TYPE.encryption, // Encryption information
        modifiedAt: date,
      },
      {
        type: MESSAGE_TYPE.messageInfo, // message info : created group name...
        modifiedAt: date,
        text: `You created group "${data.groupName}"`,
      },
    ];

    data.users = data.users.map((user) => ({
      ...user,
      color: getRandomColor(), // set a UI color for each user in a group
    }));

    return data;
  }

  createChatTemp(user) {
    const date = dayjs().format();

    return {
      user,
      messages: [
        {
          type: MESSAGE_TYPE.chatDate, // Data de creare
          modifiedAt: date,
        },
        {
          type: MESSAGE_TYPE.encryption, // Encryption information
          modifiedAt: date,
        },
      ],
    };
  }

  createChat(currentChat, newMessage) {
    const id = nanoid();
    const date = dayjs().format();
    const data = {
      id,
      modifiedAt: date,
      messages: [
        ...currentChat.messages,
        {
          type: 1, // this is message type TEXT
          text: newMessage.text,
          modifiedAt: date,
          sender: newMessage.sender,
        },
      ],
      user: currentChat.user,
    };

    return data;
  }

  sendMessageExistingChat(userChats, currentChat, newMessage) {
    const findIndexMessageList = userChats.findIndex((chat) => chat.id === currentChat.id);
    const date = dayjs().format();
    let chat;

    if (findIndexMessageList > -1) {
      chat = userChats[findIndexMessageList];
      chat.modifiedAt = date;
      chat.messages.push({
        type: 1, // this is message type TEXT
        text: newMessage.text,
        modifiedAt: date,
        sender: newMessage.sender,
      });
    }

    return {
      chat,
      index: findIndexMessageList,
    };
  }

  receiveMessage(userChats, currentChat) {
    const currentChatIndex = userChats.findIndex((chat) => chat.id === currentChat.id);

    if (currentChatIndex > -1) {
      const date = dayjs().format();
      const currentChat = { ...userChats[currentChatIndex] };
      const lastMessage = currentChat.messages[currentChat.messages.length - 1];

      const newMessage = {
        type: 1,
        text: lastMessage.text + ' ❤️', // HEART ICON AS PER TEST CHALLANGE
        modifiedAt: date,
      };

      if (currentChat.isGroup) {
        const newMessages = currentChat.users.map((user) => ({
          ...newMessage,
          sender: user.id,
          userName: user.userName,
          color: user.color,
        }));

        currentChat.messages = [...currentChat.messages, ...newMessages];
      } else {
        currentChat.messages.push({
          ...newMessage,
          sender: currentChat.user.id,
        });
      }

      return {
        currentChat,
        index: currentChatIndex,
      };
    }
  }
}
const chatService = new ChatService();

export default chatService;
