import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = { isAuthenticated: false};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        thisForm(state) {
            state.isAuthenticated = false;
        },
        thisUsers(state) {
            state.isAuthenticated = true;
        },
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;