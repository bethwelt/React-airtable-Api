import { combineReducers } from 'redux';
import studentReducer from './index';



const reducers = combineReducers({
    records: studentReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;


