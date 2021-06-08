import { USER_LOGIN } from "./actionTypes"

export const userLoginAction = (token:any) =>{
    return {
        type : USER_LOGIN,
        payload : token
    }
}