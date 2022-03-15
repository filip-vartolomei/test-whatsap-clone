import { action, computed, makeAutoObservable, observable, runInAction } from 'mobx';
import chatService from '../services/ChatService';

export class ContactsStore {
  showContacts = false;
  search = '';
  contacts = [];
  group = [];
  showGroupCreation = false;

  constructor(messagesStore) {
    // TODO: probably need to find another way to interact with other stores
    this.messagesStore = messagesStore;

    makeAutoObservable(this, {
      contacts: observable,
      filteredContacts: computed,
      search: observable,
      fetchContacts: action,
      setSearch: action.bound,
      toggleShowGroupCreation: action.bound,
      addUserToGroup: action.bound,
      removeUserFromGroup: action.bound,
      toggleContactsView: action.bound,
      createGroup: action.bound,
      createMessage: action.bound,
    });
  }

  fetchContacts() {
    const contactsData = chatService.getContacts();

    runInAction(() => {
      this.contacts = contactsData;
    });
  }

  get filteredContacts() {
    if (this.search) {
      return this.contacts.filter((c) =>
        c.userName.toLowerCase().includes(this.search.toLocaleLowerCase()),
      );
    }
    if (this.showGroupCreation && this.group.length) {
      return this.contacts.filter((c) => !this.group.some((g) => g.id === c.id));
    }
    return this.contacts;
  }

  setSearch(value) {
    this.search = value;
  }

  toggleShowGroupCreation() {
    this.showGroupCreation = !this.showGroupCreation;

    if (!this.showGroupCreation) {
      this.group = [];
    }
  }

  addUserToGroup(user) {
    const isAlreadyInList = this.group.some((u) => u.id === user.id);
    if (isAlreadyInList) {
      return;
    }
    this.group.push(user);
  }

  removeUserFromGroup(user) {
    this.group = this.group.filter((u) => u.id !== user.id);
  }

  toggleContactsView() {
    this.showContacts = !this.showContacts;

    if (!this.showContacts) {
      this.group = [];
      this.showGroupCreation = false;
    }
  }

  createGroup(groupName) {
    this.messagesStore.createGroup({ groupName, users: this.group });
    this.showContacts = false;
    this.showGroupCreation = false;
  }

  createMessage(user) {
    this.messagesStore.createChat(user);
  }
}
