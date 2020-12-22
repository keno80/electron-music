const state = {
	nowPlayMusic: {},
	musicList: {
		listStatus: false,
		list: []
	},
	playStatus: false  //false为暂停   true为正在播放
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
	},
	REFRESH_PLAY_STATUS: (state, status) => {
		state.playStatus = status
	},
	CLEAN_PLAY_LIST: (state) => {
		state.nowPlayMusic = {}
		state.musicList.list = []
		state.playStatus = false
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
	},
	refreshPlayStatus({commit}, status) {
		commit('REFRESH_PLAY_STATUS', status)
	},
	cleanPlayList({commit}) {
		commit('CLEAN_PLAY_LIST')
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}