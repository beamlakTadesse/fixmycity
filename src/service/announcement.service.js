import { authHeader } from '../helpers';

export const announcementService = {

    create,
    getAll,
    getById,
    update,
    delete: _delete
};


async function create(announcement) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // headers: {'Content-Type': 'multipart/form-data'},

        body: JSON.stringify(announcement)
        // body: {announcement}
        
    };

    const response = await fetch(`http://localhost:8000/v1/announcment/`, requestOptions);
    return handleResponse(response);
}
async function getAll() {
    console.log('getAll')
    const requestOptions = {
        method: 'GET',
        // headers: authHeader()
    };
   

    const response = (await fetch(`http://localhost:8000/v1/announcment/`, requestOptions));
    // const response = (await fetch(`https://6a46-197-156-86-169.ngrok.io/v1/announcement/`, requestOptions));

    // console.log("response",response.json())
    // const data = response;
    return handleResponse(response);
}

async function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const response = await fetch(`http://localhost:8000/v1/announcment/${id}`, requestOptions);
    return handleResponse(response);
}



async function update(announcement) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(announcement)
    };

    const response = await fetch(`http://localhost:8000/v1/announcment/${announcement.id}`, requestOptions);
    return handleResponse(response);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    const response = await fetch(`http://localhost:8000/v1/announcment/${id}`, requestOptions);
    return handleResponse(response);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}