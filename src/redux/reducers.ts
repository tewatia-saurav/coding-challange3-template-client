import { USER_LOGIN } from "./actionTypes";


const userInitialState = {
    token : ""
}

export const userReducer = (state = userInitialState, action : any) =>{
    switch (action.type) {
        case USER_LOGIN:
          return { ...state, token : action.payload};
        default:
          return state;
      }
}