import { authHeader } from '../helpers';

export const sectorService = {

    create,
    getAll,
    getById,
    update,
    delete: _delete
};


function create(sector) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sector)
    };

    return fetch(`/sectors/create`, requestOptions).then(handleResponse);
}
function getAll() {
    console.log('getAll')
    const requestOptions = {
        method: 'GET',
        // headers: authHeader()
    };

    return fetch(`/sectors`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/sectors/${id}`, requestOptions).then(handleResponse);
}



function update(sector) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(sector)
    };

    return fetch(`/sectors/${sector.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`/sectors/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}