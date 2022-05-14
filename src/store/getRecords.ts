
import { Dispatch } from 'redux';
import { ActionType, Action } from './actionTypes';
import Service from "../services/services";

export const getRecords = (name: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.PENDING
    });

    let datas
    await Service.login(name).then(
      (res: any) => {
        let data = res;
        dispatch({
          type: ActionType.SUCCESS,
          payload: data
        });
      },
      (error: any) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: ActionType.FAIL,
          payload: resMessage
        });

      }
    );

    




  }
} 

export const logout = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.PENDING
    });

    let datas
    await Service.logout()
    dispatch({
      type: ActionType.SUCCESS,
      payload: []
    });

    




  }
} 