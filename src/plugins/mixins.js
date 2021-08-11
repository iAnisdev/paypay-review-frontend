import Vue from 'vue'

Vue.mixin({
    methods: {
        isValid(value) {
            if (value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0)) {
                return false;
            }
            return true;
        },
    }
})