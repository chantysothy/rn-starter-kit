import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    mobile: "",
    captcha: "",
    zone: "+ 86",
    zones:[
        '中国 +86',
        'USA + 1',
        '返回',
    ]
});

export default function auth(state = initialState, action = {}) {
    switch (action.type) {
        case types.INPUT_VALUE_CHANGED:
            let _state = {};
            _state[action.key] = action.value;
            return state.merge(_state);
        default:
            return state;
    }
}
