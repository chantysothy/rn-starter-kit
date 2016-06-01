import * as types from './actionTypes';
import * as appActions from '../app/actions';

export function inputValueChanged(key, value) {
    return {
        type: types.INPUT_VALUE_CHANGED,
        key: key,
        value: value,
    };
}
export function logout() {
    return async function (dispatch, getState) {
        dispatch(appActions._logout)
    };
}


