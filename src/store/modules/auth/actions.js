
import API from '@/plugins/API';
import router from '@/router/index';


export const userLoginAction = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/login', data).then((res) => {
            commit('SET_LOGIN_STATUS', true);
            commit('SET_CURRENT_USER', res.data);
            commit('SET_AUTH_TOKEN', res.data.accessToken);
            resolve(res.data)
        }).catch((err) => {
            reject(err);
        });
    })
}


export const userDataAction = ({ commit }) => {
    return new Promise((resolve, reject) => {
        API().get('/userdata').then((res) => {
            commit('SET_CURRENT_USER', res.data);
            resolve(res.data)
        }).catch((err) => {
            reject(err);
        });
    });
};


export const userLogoutAction = ({ commit }) => new Promise((resolve) => {
    commit('SET_LOGIN_STATUS', false);
    commit('SET_CURRENT_USER', {});
    commit('SET_AUTH_TOKEN', '');
    router.push('/login');
    resolve()
});