const state = {
	scrollBar: true,
	tabIndex: '1'
}

const mutations = {
	RESHOW_SCROLL_BAR: (state) => {
		state.scrollBar = !state.scrollBar
	},
	CHANGE_TAB_INDEX: (state, index) => {
		state.tabIndex = index
	}
}

const actions = {
	reShowScrollBar({commit}) {
		commit('RESHOW_SCROLL_BAR')
	},
	changeTabIndex({commit}, index) {
		commit('CHANGE_TAB_INDEX', index)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}