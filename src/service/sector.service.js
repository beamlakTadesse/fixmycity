import { authHeader } from '../helpers';

export const sectorService = {

    create,
    getAll,
    getById,
    update,
    delete: _delete
};


async function create(sector) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sector)
    };

    const response = await fetch(`/sectors/create`, requestOptions);
    return handleResponse(response);
}
async function getAll() {
    console.log('getAll')
    const requestOptions = {
        method: 'GET',
        // headers: authHeader()
    };

    const response = await fetch(`/sectors`, requestOptions);
    return handleResponse(response);
}

async function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const response = await fetch(`/sectors/${id}`, requestOptions);
    return handleResponse(response);
}



async function update(sector) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(sector)
    };

    const response = await fetch(`/sectors/${sector.id}`, requestOptions);
    return handleResponse(response);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    const response = await fetch(`/sectors/${id}`, requestOptions);
    return handleResponse(response);
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