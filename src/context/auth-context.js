import { createContext, useReducer } from "react";

const initialState = {
    boughtBooks: [],
    bookCount: []
}

function reducer(state, action) {
    switch(action.type) {
        case "ADD_ITEM":
            let flag = false;
            if(state.bookCount.length != 0) {
                state.bookCount.forEach(book => {
                    if(book.title == action.payload.title) {
                        flag = true;
                        return;
                    }  
                });
                if(flag == false) {
                    return {
                        ...state,
                        boughtBooks: [...state.boughtBooks, action.payload],
                        bookCount: [...state.bookCount,
                            {
                                title: action.payload.title,
                                count: action.count
                            }
                        ]
                    }
                }
                return state;
            } else { 
            return {
                ...state,
                boughtBooks: [...state.boughtBooks, action.payload],
                bookCount: [...state.bookCount,
                    {
                        title: action.payload.title,
                        count: action.count
                    }
                ]
            } }
        case "EDIT_ITEM":
            return {
                ...state,
                bookCount: [...state.bookCount.filter(book => book.title != action.payload.title), 
                    {title: action.payload.title, count: action.count}
                ]
            }
        case "DELETE_ITEM":
            return {
                ...state,
                boughtBooks: [...state.boughtBooks.filter(book => book.title != action.payload.title)],
                bookCount: [...state.bookCount.filter(book => book.title != action.payload.title)]
            }
        default:
            return state;
    }
}

export const GobalContext = createContext([]);

export function GlobalProvider({children}) {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GobalContext.Provider value={{
            state, 
            dispatch
        }}>
            {children}
        </GobalContext.Provider>
    )
} 