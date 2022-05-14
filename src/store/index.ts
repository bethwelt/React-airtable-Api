import { Action, ActionType } from './actionTypes';

interface State {
    records: any[];
    loading: boolean;
    error: string | null;
}

const initialState = {
    records: [],
    loading: false, 
    error: null 
}

const studentReducer = (state: State = initialState, action: Action):State => {
    switch(action.type) {
        case ActionType.PENDING:
            return {
                loading: true,
                records: [],
                error: null  
            } 
        case ActionType.SUCCESS:
            return {
                loading: false,
                records: action.payload,
                error: null 
            }
        case ActionType.FAIL:
            return {
                loading: false,
                error: action.payload,
                records: []
            }
        default: 
            return state;
    }
}

export default studentReducer;