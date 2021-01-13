const state = {
	scrollBar: true,
	tabIndex: '1',
	detailTag: '歌单'  //电台和歌单详情页的tag
}

const mutations = {
	RESHOW_SCROLL_BAR: (state) => {
		state.scrollBar = !state.scrollBar
	},
	CHANGE_TAB_INDEX: (state, index) => {
		state.tabIndex = index
	},
	CHANGE_TAG: (state, tag) => {
		state.detailTag = tag
	}
}

const actions = {
	reShowScrollBar({commit}) {
		commit('RESHOW_SCROLL_BAR')
	},
	changeTabIndex({commit}, index) {
		commit('CHANGE_TAB_INDEX', index)
	},
	changeTag({commit}, tag) {
		commit('CHANGE_TAG', tag)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}