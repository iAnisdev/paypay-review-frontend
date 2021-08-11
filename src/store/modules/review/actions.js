/*eslint no-unused-vars: 0*/
import API from '@/plugins/API';

export const addPerformanceReview = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/reviews', data).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err);
        });
    })
}

export const listAllPerformaceReviews = ({ commit }) => {
    return new Promise((resolve, reject) => {
        API().get('/reviews').then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err);
        });
    })
}


export const fetchPerfromanceReview = ({ commit }, id) => {
    return new Promise((resolve, reject) => {
        API().get(`/reviews/by-id/${id}`).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err);
        });
    })
}



export const fetchRecivedReviews = ({ commit }, userId) => {
    return new Promise((resolve, reject) => {
        API().get(`/reviews/received/${userId}`).then((res) => {
            commit('SET_MY_REVIEWS', res.data)
            resolve(res.data)
        }).catch((err) => {
            reject(err);
        });
    })
}

export const fetchGivenReviews = ({ commit }, userId) => {
    return new Promise((resolve, reject) => {
        API().get(`/reviews/given/${userId}`).then((res) => {
            commit('SET_MY_REVIEWS', res.data)
            resolve(res.data)
        }).catch((err) => {
            reject(err);
        });
    })
}


export const updatePerformanceReviews = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        API().patch(`/reviews/${data.id}`, data.payload).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err);
        });
    })
}