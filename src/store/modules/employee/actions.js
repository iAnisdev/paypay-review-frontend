/*eslint no-unused-vars: 0*/

import API from '@/plugins/API';

export const listAllEmployeesAction = ({ commit }) => {
    return new Promise((resolve, reject) => {
        API().get('/users').then((res) => {
            commit('SET_EMPLOYEES_LIST', res.data.users);
            resolve(res.data.users)
        }).catch((err) => {
            reject(err);
        });
    })
}

export const createEmployeesAction = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/users', data).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err);
        });
    })
}
export const loadEmployeesAction = ({ commit }, id) => {
    return new Promise((resolve, reject) => {
        API().get(`/users/${id}`).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err);
        });
    })
}


export const updateEmployeesAction = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        API().patch(`/users/${data.id}`, data.payload).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err);
        });
    })
}


export const deleteEmployeesAction = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        API().delete(`/users/${data.id}`).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err);
        });
    })
}