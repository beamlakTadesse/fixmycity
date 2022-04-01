import { reportConstants } from '../constants/constants';

export function report(state = {}, action) {
    switch (action.type) {
        case reportConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case reportConstants.GETALL_SUCCESS:
            return {
                items: action.reports
            };
        case reportConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case reportConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(report =>
                    report.id === action.id
                        ? { ...report, deleting: true }
                        : report
                )
            };
        case reportConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(report => report.id !== action.id)
            };
        case reportConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return {
                ...state,
                items: state.items.map(report => {
                    if (report.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...reportCopy } = report;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...reportCopy, deleteError: action.error };
                    }

                    return report;
                })
            };
        default:
            return state
    }
}