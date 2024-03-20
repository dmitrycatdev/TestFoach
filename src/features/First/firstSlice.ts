import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { GitHubListItem } from "@/definitions/GitHubList";

const initialState: {list: GitHubListItem[]} = {
    list: [],
};

export const firstSlice = createSlice({
    name:     "login",
    initialState,
    reducers: {
        setList: (state, action) => {
            state.list = action.payload;
        },
    },
});

export const { setList } = firstSlice.actions;

export const selectList = (state: RootState) => state.first.list;

export default firstSlice.reducer;