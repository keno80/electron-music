const state = {
	nowPlayMusic: {},
	musicList: {
		listStatus: false,
		list: []
	}
}

const mutations = {
	NOW_PLAY_MUSIC: (state, musicInfo) => {
		state.nowPlayMusic = musicInfo
	},
	OPEN_MUSIC_LIST: (state) => {
		state.musicList.listStatus = true
	},
	CLOSE_MUSIC_LIST: (state) => {
		state.musicList.listStatus = false
	},
	ADD_PLAY_LIST_MUSIC: (state, music) => {
		state.musicList.list.push(music)
		console.log(state.musicList.list);
	}
}

const actions = {
	nowPlayMusic({commit}, musicInfo) {
		commit('NOW_PLAY_MUSIC', musicInfo)
	},
	openMusicList({commit}) {
		commit('OPEN_MUSIC_LIST')
	},
	closeMusicList({commit}) {
		commit('CLOSE_MUSIC_LIST')
	},
	addPlayListMusic({commit}, music) {
		commit('ADD_PLAY_LIST_MUSIC', music)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}