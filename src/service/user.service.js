import { authHeader } from '../helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

async function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    const response = await fetch(`/users/authenticate`, requestOptions);
    const user = await handleResponse(response);
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(user));
    return user;
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

async function getAll() {
    console.log('getAll')
    const requestOptions = {
        method: 'GET',
        // headers: authHeader()
    };

    const response = await fetch(`/users`, requestOptions);
    return handleResponse(response);
}

async function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const response = await fetch(`/users/${id}`, requestOptions);
    return handleResponse(response);
}

async function register(user) {
    console.log(user)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    const response = await fetch(`/users/register`, requestOptions);
    return handleResponse(response);
}

async function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    const response = await fetch(`/users/${user.id}`, requestOptions);
    return handleResponse(response);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        // headers: authHeader()
    };

    const response = await fetch(`/users/${id}`, requestOptions);
    return handleResponse(response);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}