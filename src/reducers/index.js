import { combineReducers } from 'redux';
import { users } from './user.reducer';
import { alert } from './alert.reducer';
import { sectors } from './sector.reducer';
import { report } from './report.reducer';
import { announcement } from './announcement.reducer';

const rootReducer = combineReducers({

    users,
    alert,
    sectors,
    report,
    announcement
});

export default rootReducer;