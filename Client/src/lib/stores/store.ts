import { createContext } from 'react';

import UiStore from '@/lib/stores/uiStore';
import ActivityStore from '@/lib/stores/activityStore';

interface Store {
  uiStore: UiStore;
  activityStore: ActivityStore;
}

export const store: Store = {
  uiStore: new UiStore(),
  activityStore: new ActivityStore(),
};

export const StoreContext = createContext(store);
