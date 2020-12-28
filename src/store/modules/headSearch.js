const state = {
	searchInfo: {
		searchWord: '',
		searchType: 1
	}
}

const mutations = {
	SAVE_SEARCH_INFO: (state, info) => {
		state.searchInfo = info
	},
}

const actions = {
	saveSearchInfo({commit}, info) {
		commit('SAVE_SEARCH_INFO', info)
	}
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}