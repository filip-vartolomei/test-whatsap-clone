import { makeAutoObservable } from 'mobx';

export class UiStore {
  user = {
    id: '0df8503b-6108-49ed-bc33-9651d8acfd4a',
    imgSrc: 'https://i.pravatar.cc/300?img=50',
    userName: 'Tobasco Stefanini',
    status: 'Disponibil',
  };

  constructor() {
    makeAutoObservable(this);
  }
}
