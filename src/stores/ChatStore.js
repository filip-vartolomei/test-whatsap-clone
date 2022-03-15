import { action, computed, makeAutoObservable, observable } from 'mobx';

export class ChatStore {
  chat = null;

  constructor() {
    makeAutoObservable(this, {
      chat: observable,
      displayStatus: computed,
      setChat: action.bound,
    });
  }

  setChat(data) {
    this.chat = data;
  }

  get displayStatus() {
    // TODO: WHY U NO WORK??
    if (this.chat.isGroup) {
      return this.chat.users.map((user) => user.userName);
    }
    return this.chat.user.status;
  }
}
