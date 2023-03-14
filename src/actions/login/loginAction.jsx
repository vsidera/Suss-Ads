import axios from 'axios';
import apiUrl from "../../utils/apiUtils/apiUrl";

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