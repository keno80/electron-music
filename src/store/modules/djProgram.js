const state = {
	radiosList: []
}

const mutations = {
	SAVE_RADIO_LIST: (state, list) => {
		state.radiosList = list
	}
}

const actions = {
	saveRadioList({commit}, list) {
		commit('SAVE_RADIO_LIST', list)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}