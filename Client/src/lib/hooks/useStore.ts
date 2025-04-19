import { useContext } from 'react';

import { StoreContext } from '../stores/store';

export const useStore = () => useContext(StoreContext);
