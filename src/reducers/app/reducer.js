import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    root: undefined, // 'login' / 'after-login',
    user_info:null
});

export default function app(state = initialState, action = {}) {
    switch (action.type) {
        case types.ROOT_CHANGED:
            return state.merge({
                root: action.root
            });
        case types.SET_USER_INFO:
            return state.merge({
                user_info: action.user_info
            });
        case types.LOGOUT:
            return state.merge({
                user_info: null
            });
        default:
            return state;
    }
}
