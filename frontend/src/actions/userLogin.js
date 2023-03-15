import axios from "axios";
import { listContactsSuccess } from "../features/listContactsSlice";
import { userLoginSuccess } from "../features/userLoginSlice";

export const register = (name, email, password) => async (dispatch) => {
    try {
        console.log("at register");
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            `http://localhost:5000/api/register/`,
            {
                name,
                email,
                password,
            },
            config
        );

        console.log(data);  
    
        dispatch(userLoginSuccess(data));

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        const errorIs =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        console.log(error);
    }
};



export const login = (email, password) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
      
        const { data } = await axios.post(
            `http://localhost:5000/api/login`,
            {
                email,
                password,
            },
            config
        );
            console.log(data);
        dispatch(userLoginSuccess(data));
        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        const errorIs =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
            console.log(error);
    }
};

export const addContact = (fname, lname, phone, email) => async (dispatch, getState) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const {
            userLogin: { userInfo },
          } = getState();
         const id= userInfo.user._id

         console.log(id, "add contacts");
      
        const { data } = await axios.post(
            `http://localhost:5000/api/add-contact`,
            {
                fname, lname, phone, email, id
            },
            config
        );
            console.log(data);
            

    } catch (error) {
        const errorIs =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
            console.log(error);
    }
};

export const listContacts = () => async (dispatch, getState) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const {
            userLogin: { userInfo },
          } = getState();
         const id= userInfo.user._id

         console.log(id, "list contacts");
      
        const { data } = await axios.get(
            `http://localhost:5000/api/list-contacts/${id}`,
            config
        );

        dispatch(listContactsSuccess(data))
            

    } catch (error) {
        const errorIs =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
            console.log(error);
    }
};

export const editContact = (fname, lname, phone, id) => async (dispatch, getState) => {
    try {

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const {
            userLogin: { userInfo },
          } = getState();
         const uid= userInfo.user._id
         console.log(id, "edit contacts");
      
        const { data } = await axios.post(
            `http://localhost:5000/api/edit-contact`,
            {
                fname, lname, phone,id,uid
            },
            config
        );
            

    } catch (error) {
        const errorIs =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
            console.log(error);
    }
};

export const deleteContact = (did) => async (dispatch, getState) => {
    try {

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };       
      
        const { data } = await axios.post(
            `http://localhost:5000/api/delete-contact`,
            {
                did
            },
            config
        );
            

    } catch (error) {
        const errorIs =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
            console.log(error);
    }
};

