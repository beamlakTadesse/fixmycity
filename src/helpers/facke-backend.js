// array in local storage for registered users



let users = JSON.parse(localStorage.getItem('users')) || [];
let sectors = JSON.parse(localStorage.getItem('sectors')) || [];
export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const { method, headers } = opts;
        const body = opts.body && JSON.parse(opts.body);

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/users/authenticate') && method === 'POST':
                        return authenticate();
                    case url.endsWith('/users/register') && method === 'POST':
                        return register();
                    case url.endsWith('/sectors/create') && method === 'POST':
                        return create();

                    case url.endsWith('/users') && method === 'GET':
                        return getUsers();
                    case url.endsWith('/sectors') && method === 'GET':
                        return getSectors();
                    case url.match(/\/users\/\d+$/) && method === 'DELETE':
                        return deleteUser();
                    case url.match(/\/sectors\/\d+$/) && method === 'DELETE':
                        return deleteSector();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function authenticate() {
                const { username, password } = body;
                const user = users.find(x => x.username === username && x.password === password);
                if (!user) return error('Username or password is incorrect');
                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: 'fake-jwt-token'
                });
            }

            function register() {
                const user = body;

                if (users.find(x => x.username === user.username)) {
                    return error(`Username  ${user.username} is already taken`);
                }

                // assign user id and a few other properties then save
                user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));

                return ok();
            }
            function create() {
                const sector = body;

                if (sectors.find(x => x.districtName === sector.districtName)) {
                    return error(`district name  ${sector.districtName} is already taken`);
                }

                // assign user id and a few other properties then save
                sector.id = sectors.length ? Math.max(...sectors.map(x => x.id)) + 1 : 1;
                sectors.push(sector);
                localStorage.setItem('sectors', JSON.stringify(sectors));

                return ok();
            }


            function getUsers() {
                // if (!isLoggedIn()) return unauthorized();

                return ok(users);
            }
            function getSectors() {
                // if (!isLoggedIn()) return unauthorized();

                return ok(sectors);
            }
            function deleteUser() {
                // if (!isLoggedIn()) return unauthorized();

                users = users.filter(x => x.id !== idFromUrl());
                localStorage.setItem('users', JSON.stringify(users));
                return ok();
            }
            function deleteSector() {
                // if (!isLoggedIn()) return unauthorized();

                sectors = sectors.filter(x => x.id !== idFromUrl());
                localStorage.setItem('sectors', JSON.stringify(sectors));
                return ok();
            }

            // helper functions

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
            }

            function unauthorized() {
                resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) });
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
            }

            function isLoggedIn() {
                return headers['Authorization'] === 'Bearer fake-jwt-token';
            }

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }
        });
    }
}