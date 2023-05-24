import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../state/index.js"

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
});