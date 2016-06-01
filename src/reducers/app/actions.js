import * as types from './actionTypes';

export function appInitialized() {
    return async function (dispatch, getState) {
        // since all business logic should be inside redux actions
        // this is a good place to put your app initialization code
        let state = getState();
        console.log("userinfo",state.app.user_info)
        if(state.app.user_info){
            dispatch(changeAppRoot('after-login'));
        }else{
            dispatch(changeAppRoot('login'));
        }
    };
}

export function changeAppRoot(root) {
    return {type: types.ROOT_CHANGED, root: root};
}
export function setUserInfo(user_info) {
    return {type: types.SET_USER_INFO, user_info: user_info};
}
export function login(user_info) {
    return async function (dispatch, getState) {
        // login logic would go here, and when it's done, we switch app roots
        dispatch(setUserInfo(user_info));
        dispatch(changeAppRoot('after-login'));
    };
}
export function _logout() {
    return {type: types.LOGOUT};
}
export function logout() {
    return async function (dispatch, getState) {
        // login logic would go here, and when it's done, we switch app roots
        dispatch(_logout());
        dispatch(changeAppRoot('login'));
    };
}