import axios from 'axios';
import apiUrl from "../../utils/apiUtils/apiUrl";
import { authHeaders } from '../../utils/headers/headers';

export function contactsAction(app_id) {
    const contactsUrl = `${apiUrl.LIST_CONTACTS}/${app_id}/list`;
    const config = authHeaders();
  
    return axios
      .get(contactsUrl, config)
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

  export function contactCreate(formValues) {
    console.log("FORMVALUES ARE!!!!!!!!!!!!!",formValues)
    const contactCreateUrl = `${apiUrl.CREATE_CONTACT}/${formValues.app_id}/create`;
    const config = authHeaders();
  
    return axios
      .post(contactCreateUrl, formValues.newContact, config)
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
              _error: 'The app could not be created.',
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

  export function uploadContacts(formValues) {
    const uploadContactsUrl = apiUrl.CREATE_CONTACTS;
    const config = authHeaders();
  
    return axios
      .post(uploadContactsUrl, config, formValues)
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