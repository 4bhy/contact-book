import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userLoginReducer from "../features/userLoginSlice";
import listContactsReducer from "../features/listContactsSlice";


const store = configureStore({
    reducer: {
        userLogin: userLoginReducer,
        listContacts: listContactsReducer
    }
})

export default store;