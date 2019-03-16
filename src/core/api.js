export const errorHandler = (response) =>
    response.ok ?
        Promise.resolve(response) :
        Promise.reject(Error(`${response.status}: ${response.statusText}`));

export const jsonHandler = (response) => response.json();

class API {
    getData = (year = '', province = '') =>
        fetch(`data?year=${year}&province=${province}`)
            .then(errorHandler).then(jsonHandler);
}

const instance = new API();

export default instance;
