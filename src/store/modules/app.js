const state = {
	scrollBar: true
}

const mutations = {
	RESHOW_SCROLL_BAR: (state) => {
		state.scrollBar = !state.scrollBar
	}
}

const actions = {
	reShowScrollBar({commit}) {
		commit('RESHOW_SCROLL_BAR')
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}