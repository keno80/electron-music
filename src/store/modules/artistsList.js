const state = {
	selectedType: -1,
	selectedArea: -1,
	selectedLetter: -1,
	artistId: ''
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
	},
	SAVE_ARTIST_ID: (state, id) => {
		state.artistId = id
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
	},
	saveArtistId({commit}, id) {
		commit('SAVE_ARTIST_ID', id)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}