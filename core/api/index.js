import Service from './service.js';

const API = {};

API.GetAction = (method, successCb, errorCb) => {
    Service.sendRequest('GET', method, null, null, successCb, errorCb);
};

API.PostAction = (method, params, body, successCb, errorCb) => {
    Service.sendRequest('POST', method, null, body, successCb, errorCb);
};

API.PutAction = (method, params, body, successCb, errorCb) => {
    Service.sendRequest('PUT', method, params, body, successCb, errorCb)
};
API.DeleteAction = (method, params, successCb, errorCb) => {
    Service.sendRequest('DELETE', method, params, null, successCb, errorCb)
};

export default API;