import { combineReducers } from 'redux';
import { users } from './user.reducer';
import { alert } from './alert.reducer';
import { sectors } from './sector.reducer';
import { report } from './report.reducer';

const rootReducer = combineReducers({

    users,
    alert,
    sectors,
    report
});

export default rootReducer;