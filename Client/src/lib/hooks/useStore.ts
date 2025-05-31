import { useContext } from 'react';

import { StoreContext } from '@/lib/stores/store';

export const useStore = () => useContext(StoreContext);
