import { sectorConstants } from '../constants/constants';
import { sectorService } from '../service';
import { alertActions } from './';
import { history } from '../helpers';

export const sectorActions = {
    create,
    getAll,
    delete: _delete
};





function create(sector) {
    return dispatch => {
        dispatch(request(sector));

        sectorService.create(sector)
            .then(
                user => {
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(sector) { return { type: sectorConstants.CREATE_REQUEST, sector } }
    function success(sector) { return { type: sectorConstants.CREATE_SUCCESS, sector } }
    function failure(error) { return { type: sectorConstants.CREATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());
        console.log('hello getall users...')
        sectorService.getAll()
            .then(
                sectors => dispatch(success(sectors)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: sectorConstants.GETALL_REQUEST } }
    function success(sectors) { return { type: sectorConstants.GETALL_SUCCESS, sectors } }
    function failure(error) { return { type: sectorConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        sectorService.delete(id)
            .then(
                sectors => dispatch(success(sectors)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: sectorConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: sectorConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: sectorConstants.DELETE_FAILURE, id, error } }
}