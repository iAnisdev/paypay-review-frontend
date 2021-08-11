import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters'

const state = {
    isLoggedIn: false,
    userToken: '',
    currentUser: {}
}

export default {
    state,
    actions,
    mutations,
    getters,
}