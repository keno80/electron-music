const state = {
	selectedType: -1,
	selectedArea: -1,
	selectedLetter: -1
}

const mutations = {
	CHANGE_TYPE: (state, type) => {
		state.selectedType = type
	},
	CHANGE_AREA: (state, area) => {
		state.selectedArea = area
	},
	CHANGE_LETTER: (state, letter) => {
		state.selectedLetter = letter
	}
}

const actions = {
	changeType({commit}, type) {
		commit('CHANGE_TYPE', type)
	},
	changeArea({commit}, area) {
		commit('CHANGE_AREA', area)
	},
	changeLetter({commit}, letter) {
		commit('CHANGE_LETTER', letter)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}