import { combineReducers } from 'redux';
import { users } from './user.reducer';
import { alert } from './alert.reducer';
import { sectors } from './sector.reducer';

const rootReducer = combineReducers({

    users,
    alert,
    sectors
});

export default rootReducer;