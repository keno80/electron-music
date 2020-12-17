const state = {
	cachedHistory: [],
	backNum: 0,
	forwardNum: 0
}

const mutations = {
	CACHE_HISTORY: (state, info) => {
		state.cachedHistory.push(info.history)
		console.log(state);
	}
}

const actions = {
	cacheHistory({commit}, info) {
		console.log(info);
		// commit('CACHE_HISTORY', info)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}