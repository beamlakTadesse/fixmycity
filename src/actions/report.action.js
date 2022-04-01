import { reportConstants } from '../constants/constants';
import { reportService } from '../service';
import { alertActions } from './';
import { history } from '../helpers';

export const reportActions = {
    // create,
    getAll,
    // delete: _delete
};


function getAll() {
    return dispatch => {
        dispatch(request());

        reportService.getAll()
            .then(
                reports => dispatch(success(reports)),
                error => dispatch(failure(error.toString()))

            );

    };

    function request() { return { type: reportConstants.GETALL_REQUEST } }
    function success(reports) { return { type: reportConstants.GETALL_SUCCESS, reports } }
    function failure(error) { return { type: reportConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        reportService.delete(id)
            .then(
                sectors => dispatch(success(sectors)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: reportConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: reportConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: reportConstants.DELETE_FAILURE, id, error } }
}