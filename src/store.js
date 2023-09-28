import { createStore } from 'vuex'

export default createStore({
    state: {
        toastMessage: null,
        toastSeverity: null,
    },
    mutations: {
        setToastMessage(state, message) {
            state.toastMessage = message;
        },
        setToastSeverity(state, severity) {
            state.toastSeverity = severity;
        },
        setToastSummary(state, summary) {
            state.toastSummary = summary;
        }
    },
    actions: {
        showToast({ commit }, { message, severity, summary }) {
            commit('setToastMessage', message);
            commit('setToastSeverity', severity);
            commit('setToastSummary', summary);
        },
    },
})
