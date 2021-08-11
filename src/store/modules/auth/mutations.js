module.exports = {
    SET_AUTH_TOKEN: (state, token) => {
        state.userToken = token;
    },
    SET_LOGIN_STATUS: (state, status) => {
        state.isLoggedIn = status;
    },
    SET_CURRENT_USER: (state, user) => {
        state.currentUser = user;
    }
}