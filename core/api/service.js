import {HOST} from '../constants';

const Service = {};

const constructURL = (method, params = null) => {
    return params ? `${HOST}/${method}/${params}` : `${HOST}/${method}`;
};

Service.sendRequest = (methodType, method, params, body, successCb, errorCb) => {

    debugger;
    const url = constructURL(method, params);
    const init = {
        method: methodType,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    };

    fetch(url, init)
        .then(resp => resp.json())
        .then(json => {
            successCb && typeof successCb === 'function' && successCb(json);
        })
        .catch((err) => {
            errorCb && typeof errorCb === 'function' && errorCb(err);
        });
};

export default Service;