


export enum ActionType {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAIL = 'FAIL'
}

interface actionPending {
    type: ActionType.PENDING;
}

interface actionSuccess {
    type: ActionType.SUCCESS;
    payload: any[];
}

interface actionFail {
    type: ActionType.FAIL;
    payload: string;
}

export type Action = actionPending | actionSuccess | actionFail;