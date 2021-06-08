import axios from 'axios';
import { userLoginAction } from '../redux/actions'
export const userSignup = async (user: any) => {
    return await axios.post(`http://localhost:4000/api/user/register`, user);
  };
  
  export const userLogin = async (dispatch: any, user: any) => {
    let res = await axios.post("http://localhost:4000/api/user/login", user);
  
    dispatch(userLoginAction(res.data.token));
    return res;
  };