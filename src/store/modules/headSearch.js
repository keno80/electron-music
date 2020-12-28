const state = {
	searchInfo: {
		searchWord: '',
		searchType: 1
	},
	searchResponse: {},  //搜索的返回数据
}

const mutations = {
	SAVE_SEARCH_WORD: (state, searchWord) => {
		state.searchInfo.searchWord = searchWord
	},
	SAVE_SEARCH_TYPE: (state, searchType) => {
		state.searchInfo.searchType = searchType
	},
	SAVE_RESPONSE_DATA: (state, data) => {
		state.searchResponse = data
	}
}

const actions = {
	saveSearchWord({commit}, searchWord) {
		commit('SAVE_SEARCH_WORD', searchWord)
	},
	saveSearchType({commit}, searchType) {
		commit('SAVE_SEARCH_TYPE', searchType)
	},
	saveResponse({commit}, data) {
		commit('SAVE_RESPONSE_DATA', data)
	}
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}