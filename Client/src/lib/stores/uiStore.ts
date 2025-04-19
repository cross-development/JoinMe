import { makeAutoObservable } from 'mobx';

class UiStore {
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  public isBusy = (): void => {
    this.isLoading = true;
  };

  public isIdle = (): void => {
    this.isLoading = false;
  };
}

export default UiStore;
