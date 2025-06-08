import { makeAutoObservable } from 'mobx';

class ActivityStore {
  filter = 'all';
  startDate = new Date().toISOString();

  constructor() {
    makeAutoObservable(this);
  }

  public setFilter = (filter: string): void => {
    this.filter = filter;
  };

  public setStartDate = (date: Date): void => {
    this.startDate = date.toISOString();
  };
}

export default ActivityStore;
