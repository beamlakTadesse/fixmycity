import { combineReducers } from 'redux';
import { users } from './user.reducer';
import { alert } from './alert.reducer';
import { sectors } from './sector.reducer';
import { profileReducer } from './profile-reducer';

const rootReducer = combineReducers({

    users,
    alert,
    sectors,
    profileReducer
});

export default rootReducer;