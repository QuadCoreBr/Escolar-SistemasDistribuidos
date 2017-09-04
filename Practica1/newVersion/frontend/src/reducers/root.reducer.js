import {combineReducers} from 'redux';

import clocks from './clocks.reducer';
import selectedClock from './selectedClock.reducer';

const rootReducer = combineReducers({
    clocks,
    selectedClock
});

export default rootReducer;