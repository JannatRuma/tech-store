//login user
import Axios from 'axios';
import url from '../utils/URL'

const loginUser = async({email, password}) => {
    const response = await Axios
    .post(`${url}/auth/local`, {
        identifier: email,
        password,
    })
    .catch(error=> console.log(error))
    return response;
};

export default loginUser;
