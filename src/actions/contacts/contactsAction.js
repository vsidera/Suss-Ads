import axios from 'axios';
import apiUrl from "../../utils/apiUtils/apiUrl";

export function contactsAction(formValues) {
    const contactsUrl = apiUrl.LIST_CONTACTS;
  
    return axios
      .post(contactsUrl, formValues)
      .then((res) => {
      
        if (res.data && res.status === 200) {

            console.log("THE RESPONSE IS !!!!!!!",res)
          
        }
        return res;
      })
      .catch((error) => {
        if (error.response) {
        
          return {
            errors: {
              _error: 'The contacts could not be returned.',
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