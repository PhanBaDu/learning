import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: null,
    error: null,
    loading: false,
    listPost: [],
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        postsSuccess: (state, action) => {
            state.posts = action.payload;
            state.loading = false;
            state.error = null;
        },
        postsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getPostsSuccess: (state, action) => {
            state.listPost = action.payload;
        },
    },
});

export const { postsStart, postsSuccess, postsFailure, getPostsSuccess } = postSlice.actions;

export default postSlice.reducer;
