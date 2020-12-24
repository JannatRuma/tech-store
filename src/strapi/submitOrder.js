// submit order
import Axios from 'axios';
import url from '../utils/URL';

const submitOrder = async ({name, total, items, stripeTokenId,userToken}) => {
    const response = await Axios
    .post(`${url}/orders`, {
        name, total, items,stripeTokenId
    }, {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .catch(error=> console.log(error))
    return response;
};

export default submitOrder;