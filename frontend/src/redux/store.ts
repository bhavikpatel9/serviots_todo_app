import { configureStore } from '@reduxjs/toolkit';
import { type Middleware } from 'redux';
import { persistStore } from 'redux-persist';
import rootReducer from '@/redux/root.reducer';

const Middlewares: Middleware[] = [];

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false
        }).concat(Middlewares)
});

export const persister = persistStore(store);
const exportStore = { store, persister };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default exportStore;
