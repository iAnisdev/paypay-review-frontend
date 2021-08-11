module.exports = {
    getUserToken: (state) => state.userToken,
    getLoginStatus: (state) => state.isLoggedIn,
    getCurrentUser: (state) => state.currentUser
}