import axios from 'axios';

const setAuthToken = token => {

    if (token) {
        axios.defaults.headers.common["authorization"] = "Bearer " + token.slice(1,token.length-1);
    } else {
        delete axios.defaults.headers.common["authorization"];
    }
}

export default setAuthToken;