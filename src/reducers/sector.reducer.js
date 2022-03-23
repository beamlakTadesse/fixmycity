import { sectorConstants } from '../constants/constants';

export function sectors(state = {}, action) {
    switch (action.type) {
        case sectorConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case sectorConstants.GETALL_SUCCESS:
            return {
                items: action.sectors
            };
        case sectorConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case sectorConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(sector =>
                    sector.id === action.id
                        ? { ...sector, deleting: true }
                        : sector
                )
            };
        case sectorConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(sector => sector.id !== action.id)
            };
        case sectorConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return {
                ...state,
                items: state.items.map(sector => {
                    if (sector.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...sectorCopy } = sector;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...sectorCopy, deleteError: action.error };
                    }

                    return sector;
                })
            };
        default:
            return state
    }
}