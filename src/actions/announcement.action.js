import { announcementConstants } from '../constants/constants';
import { announcementService } from '../service';
import { alertActions } from './';
import { history } from '../helpers';
// import { announcement } from 'reducers/announcement.reducer';

export const announcementActions = {
    create,
    getAll,
    delete: _delete
};





function create(announcement) {
    return dispatch => {
        dispatch(request(announcement));

        announcementService.create(announcement)
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

    function request(announcement) { return { type: announcementConstants.CREATE_REQUEST, announcement } }
    function success(announcement) { return { type: announcementConstants.CREATE_SUCCESS, announcement } }
    function failure(error) { return { type: announcementConstants.CREATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());
        console.log('hello getall users...')
        announcementService.getAll()
            .then(
                announcements => dispatch(success(announcements)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: announcementConstants.GETALL_REQUEST } }
    function success(announcements) { return { type: announcementConstants.GETALL_SUCCESS, announcements } }
    function failure(error) { return { type: announcementConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        announcementService.delete(id)
            .then(
                announcements => dispatch(success(announcements)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: announcementConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: announcementConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: announcementConstants.DELETE_FAILURE, id, error } }
}