import { announcementConstants } from '../constants/constants';

export function announcement(state = {}, action) {
    switch (action.type) {
        case announcementConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case announcementConstants.GETALL_SUCCESS:
            return {
                items: action.announcements.results
            };
        case announcementConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case announcementConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(announcement =>
                    announcement.id === action.id
                        ? { ...announcement, deleting: true }
                        : announcement
                )
            };
        case announcementConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(announcement => announcement.id !== action.id)
            };
        case announcementConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return {
                ...state,
                items: state.items.map(announcement => {
                    if (announcement.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...announcementCopy } = announcement;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...announcementCopy, deleteError: action.error };
                    }

                    return announcement;
                })
            };
        default:
            return state
    }
}