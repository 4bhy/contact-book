import { createSlice } from "@reduxjs/toolkit";

const initialState = {
};

const listContactsSlice = createSlice({
    name: "listcontacts",
    initialState,
    reducers: {

        listContactsSuccess: (state, action) => {
            state.contactList = action.payload;
        },
    },
});

export default listContactsSlice.reducer;
export const { listContactsSuccess } = listContactsSlice.actions;
