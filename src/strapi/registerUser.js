// register user
import Axios from 'axios';
import url from '../utils/URL'

const registerUser = async({email, password, username}) => {
    const response = await Axios
    .post(`${url}/auth/local/register`, {
        username,
        email,
        password,
    })
    .catch(error=> console.log(error))
    return response;
};

export default registerUser;