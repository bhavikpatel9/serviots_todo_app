import { type UserState, clearUser, setUser } from '@/redux/ducks/user';
import { store } from '@/redux/store';

export const dispatchSetUser = (user: Partial<UserState>) => {
    store.dispatch(setUser(user));
};

export const dispatchClearUser = () => {
    store.dispatch(clearUser());
};
