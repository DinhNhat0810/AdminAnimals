import { createSlice } from '@reduxjs/toolkit';

const dataStorage = JSON.parse(localStorage.getItem('user'));

const initialState = {
    currentUser: dataStorage || null,
    loading: false,
    error: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },

        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
            localStorage.setItem('user', JSON.stringify(null));
        },

        updateUserSuccess: (state, action) => {
            console.log(action.payload);
            state.currentUser = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription, updateUserSuccess } = userSlice.actions;

export const selectUser = (state) => {
    return state.user;
};

export default userSlice.reducer;
