import { createContext, useEffect, useReducer } from "react";
// Context api(React state managment tool) provides a way to pass data through the component tree without having to pass props down manually at every level.


//1/defining our initial state
const INITIAL_STATE = {
    // Converts a JavaScript Object Notation (JSON) string into an object.
    // when we refresh the page , the local storage is checked firstly to set user value else null
    admin: JSON.parse(localStorage.getItem("admin")) || null,
    employe: JSON.parse(localStorage.getItem("employe")) || null,
    loading: false,
    error: null
};

// 2/create context using initial state(React.createContext() is all you need. It returns a consumer and a provider. Provider is a component that as it's name suggests provides the state to its children. It will hold the "store" and be the parent of all the components that might need that store. Consumer as it so happens is a component that consumes and uses the state.)
export const AuthContext = createContext(INITIAL_STATE);

// 3/define our app actions using reducer function(Reducers are functions that take the current state and an action as arguments, and return a new state result. In other words, (state, action) => newState.)
const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                admin: JSON.parse(localStorage.getItem("admin")),
                employe: JSON.parse(localStorage.getItem("employe")),
                loading: true,
                error: null,
            };
        case "LOGIN_SUCCESS_A":
            return {
                admin: action.payload,
                employe: JSON.parse(localStorage.getItem("employe")),
                loading: false,
                error: null,
            };
        case "LOGIN_SUCCESS_E":
            return {
                admin: JSON.parse(localStorage.getItem("admin")),
                employe: action.payload,
                loading: false,
                error: null,
            };
        case "LOGIN_FAILURE":
            return {
                admin: JSON.parse(localStorage.getItem("admin")),
                employe: JSON.parse(localStorage.getItem("employe")),
                loading: false,
                error: action.payload,
            };
        case "LOGOUT_A":
            return {
                admin: null,
                employe: JSON.parse(localStorage.getItem("employe")),
                loading: false,
                error: null,
            };
        case "LOGOUT_E":
            return {
                admin: JSON.parse(localStorage.getItem("admin")),
                employe: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

// 4/defining the context provider:
export const AuthContextProvider = ({ children }) => {
    // The useReducer(reducer, initialState) hook accept 2 arguments: the reducer function and the initial state. The hook then returns an array of 2 items: the current state and the dispatch function.
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    // we gonna save the user data in local storage(table of key:string values stored locally in the browser) if case state.user is updated 
    useEffect(() => {
        localStorage.setItem("employe", JSON.stringify(state.employe));
    }, [state.employe]);
    useEffect(() => {
        localStorage.setItem("admin", JSON.stringify(state.admin));
    }, [state.admin]);
    return (
        // we should expose a state to the component consuming the data
        <AuthContext.Provider
            value={{
                admin: state.admin,
                employe: state.employe,
                loading: state.loading,
                error: state.error,
                state,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
