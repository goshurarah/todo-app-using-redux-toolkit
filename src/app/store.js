import { configureStore } from "@reduxjs/toolkit";
import toDoReducer from "../Components/toDoReducer";

export const store = configureStore(
    {
        reducer: {
            ADD: toDoReducer,
        }
    }
)