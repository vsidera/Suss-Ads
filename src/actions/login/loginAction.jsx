import axios from 'axios';
import apiUrl from "../../utils/apiUtils/apiUrl";
import { authHeaders } from '../../utils/headers/headers';

export function loginAction(formValues) {
    const loginUrl = apiUrl.LOGIN_URL;

    console.log("THE URL IS!!!!!",loginUrl)
  
    return axios
      .post(loginUrl, formValues)
      .then((res) => {
      
        if (res.data && res.status === 200) {
          
          localStorage.setItem('key', JSON.stringify(res.data.token));
        }
        return res;
      })
      .catch((error) => {
        if (error.response) {
        
          return {
            errors: {
              _error: 'The credentials you have entered are not correct.',
            },
          };
        }   
        return {
          errors: {
            _error: 'Network error. Please try again.',
          },
        };
      });
  }

  export function registerAction(formValues) {
    const registerUser = apiUrl.REGISTER_USER;
    const config = authHeaders();
  
    return axios
      .post(registerUser,config, formValues)
      .then((res) => {
      
        if (res.data && res.status === 200) {

        }
        return res;
      })
      .catch((error) => {
        if (error.response) {
        
          return {
            errors: {
              _error: 'The credentials you have entered are not correct.',
            },
          };
        }   
        return {
          errors: {
            _error: 'Network error. Please try again.',
          },
        };
      });
  }