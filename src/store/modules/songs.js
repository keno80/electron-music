const state = {
	nowPlayMusic: {}
}

const mutations = {
	NOW_PLAY_MUSIC: (state, musicInfo) => {
		state.nowPlayMusic = musicInfo
	}
}

const actions = {
	nowPlayMusic({commit}, musicInfo) {
		commit('NOW_PLAY_MUSIC', musicInfo)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}