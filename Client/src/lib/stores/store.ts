import { createContext } from 'react';

import UiStore from '@/lib/stores/uiStore';

interface Store {
  uiStore: UiStore;
}

export const store: Store = {
  uiStore: new UiStore(),
};

export const StoreContext = createContext(store);
