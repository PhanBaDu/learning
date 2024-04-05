import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    comment: [],
    error: null,
    loading: false,
};

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        commentStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        commentSuccess: (state, action) => {
            state.comment = action.payload;
            state.loading = false;
            state.error = null;
        },
        commentFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { commentStart, commentSuccess, commentFailure } = commentSlice.actions;

export default commentSlice.reducer;
