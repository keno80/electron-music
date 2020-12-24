const state = {
	nowPlayMusic: {},
	Lyric: [],
	LyricIndex: 0,
	musicList: {
		listStatus: false,
		list: []
	},
	playStatus: false,  //false为暂停   true为正在播放
	musicDetail: {
		status: false  //歌曲歌词页面开关状态   false为关闭  true为开启
	}
}

const mutations = {
	NOW_PLAY_MUSIC: (state, musicInfo) => {
		state.nowPlayMusic = musicInfo
	},
	SAVE_LYRIC: (state, lyric) => {
		state.Lyric = lyric
	},
	SAVE_LYRIC_INDEX: (state, index) => {
		state.LyricIndex = index
	},
	OPEN_MUSIC_LIST: (state) => {
		state.musicList.listStatus = true
	},
	CLOSE_MUSIC_LIST: (state) => {
		state.musicList.listStatus = false
	},
	ADD_PLAY_LIST_MUSIC: (state, music) => {
		state.musicList.list.push(music)
	},
	REFRESH_PLAY_STATUS: (state, status) => {
		state.playStatus = status
	},
	TOGGLE_DETAIL_STATUS: (state) => {
		state.musicDetail.status ? state.musicDetail.status = false : state.musicDetail.status = true
	},
	CLEAN_PLAY_LIST: (state) => {
		state.nowPlayMusic = {}
		state.musicList.list = []
		state.playStatus = false
		state.musicDetail.status = false
	},
}

const actions = {
	nowPlayMusic({commit}, musicInfo) {
		commit('NOW_PLAY_MUSIC', musicInfo)
	},
	saveLyric({commit}, lyric) {
		commit('SAVE_LYRIC', lyric)
	},
	saveLyricIndex({commit}, index) {
		commit('SAVE_LYRIC_INDEX', index)
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
	toggleDetailStatus({commit}) {
		commit('TOGGLE_DETAIL_STATUS')
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