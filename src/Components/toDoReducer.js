import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    TO_DO_DATA: []
}

const toDoReducer = createSlice(
    {
        name: 'ADD',
        initialState,
        reducers: {
            onAddFunc: (state, action) => {
                return {
                    TO_DO_DATA: [...state.TO_DO_DATA, action.payload]
                }
            },
            onDelFunc: (state, action) => {
                return {
                    TO_DO_DATA: [...state.TO_DO_DATA.filter((filterItem, filterIndex) => {
                        return filterIndex !== action.payload.index
                    })]
                }
            },
            onUpdateFunc: (state, action) => {
                return {
                    TO_DO_DATA: [...state.TO_DO_DATA.map((Items, Index) => {
                        if (Index === action.payload.index) {
                            return {
                                title: action.payload.title,
                                description: action.payload.description,
                            }
                        }
                        return Items
                    })]
                }
            }
        }
    }
)
export default toDoReducer.reducer
export const { onAddFunc, onDelFunc, onUpdateFunc } = toDoReducer.actions