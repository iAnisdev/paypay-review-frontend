import Vue from 'vue';

export default new Vue({
    methods: {
        emitTriggerSnackBar(data) {
            this.$emit('triggerSnackBar', data);
        },
        emitTriggerLoader(status) {
            this.$emit('triggerLoader', status);
        }
    }
})