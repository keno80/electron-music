const state = {
	radiosList: [],
	programList: [],
	programDetail: {}
}

const mutations = {
	SAVE_RADIO_LIST: (state, list) => {
		state.radiosList = list
	},
	SAVE_RADIO_PROGRAMS_LIST: (state, list) => {
		state.programList = list
	},
	SAVE_RADIO_PROGRAMS_DETAIL: (state, detail) => {
		state.programDetail = detail
	}
}

const actions = {
	saveRadioList({commit}, list) {
		commit('SAVE_RADIO_LIST', list)
	},
	saveRadioProgramsList({commit}, list) {
		commit('SAVE_RADIO_PROGRAMS_LIST', list)
	},
	saveRadioProgramsDetail({commit}, detail) {
		commit('SAVE_RADIO_PROGRAMS_DETAIL', detail)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}