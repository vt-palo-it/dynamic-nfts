import { configureStore } from '@reduxjs/toolkit';
import contractReducer from '../features/contractSlice';

export const store = configureStore({
    reducer: {
        contract: contractReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            // Ignore these action types
            ignoredActions: ['contract/init/fulfilled'],
            ignoredPaths: ['contract.contract'],
        },
    }),
});