/*eslint no-unused-vars: 0*/

import API from '@/plugins/API';

export const listPendingRequests = ({ commit }) => {
    return new Promise((resolve, reject) => {
        API().get(`/requests`).then((res) => {
            commit('SET_PENDING_REQUEST', res.data.list);
            resolve(res.data.list)
        }).catch((err) => {
            reject(err);
        });
    })
}


export const loadRequest = ({ commit }, id) => {
    return new Promise((resolve, reject) => {
        API().get(`/requests/${id}`).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err);
        });
    })
}

export const listCurrentUserPendingRequests = ({ commit }, id) => {
    return new Promise((resolve, reject) => {
        API().get(`/requests/reviewfor/${id}`).then((res) => {
            resolve(res.data.list)
        }).catch((err) => {
            reject(err);
        });
    })
}

export const listRequireFeedbackRequest = ({ commit }, id) => {
    return new Promise((resolve, reject) => {
        API().get(`/requests/reviewer/${id}`).then((res) => {
            resolve(res.data.list)
        }).catch((err) => {
            reject(err);
        });
    })
}

export const addReviewRequest = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/requests', data).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err);
        });
    })
}

export const patchReviewRequest = ({ commit }, id) => {
    return new Promise((resolve, reject) => {
        API().patch(`/requests/${id}`).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err);
        });
    })
}

export const deleteReviewRequest = ({ commit }, id) => {
    return new Promise((resolve, reject) => {
        API().delete(`/requests/${id}`).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err);
        });
    })
}