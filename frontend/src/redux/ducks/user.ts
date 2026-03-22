import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export type UserState = {
    id: string;
    email: string;
    name: string;
    token: string;
};

const initialState: UserState = {
    id: '',
    email: '',
    name: '',
    token: '',
};

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Partial<UserState>>) => {
            return { ...state, ...action.payload };
        },
        clearUser: () => {
            return {
                ...initialState
            };
        }
    }
});

export const currentUser = (state: { user: UserState }) => state.user; // export slice name call to reduce code in useSelector

export const { setUser, clearUser } = user.actions; // export all action
export default user.reducer;
