const state = {
	detail: {},  //歌单详情、简介
	songs: [],  //此歌单包含的歌曲
	musicListIds: []  //歌单ID，用于判断当前歌单的歌曲是否存在与播放列表
}

const mutations = {
	SAVE_MUSIC_LIST_DETAIL: (state, info) => {
		state.detail = info
	},
	SAVE_MUSIC_LIST_SONGS: (state, songs) => {
		state.songs = songs
	},
	SAVE_MUSIC_LIST_IDS: (state, id) => {
		state.musicListIds.push(id)
	},
	CLEAN_PLAY_LIST_STATE: (state) => {
		state.musicListIds = []
	}
}

const actions = {
	saveMusicListDetail({commit}, info) {
		commit('SAVE_MUSIC_LIST_DETAIL', info)
	},
	saveMusicListSongs({commit}, songs) {
		commit('SAVE_MUSIC_LIST_SONGS', songs)
	},
	saveMusicListIds({commit}, id) {
		commit('SAVE_MUSIC_LIST_IDS', id)
	},
	cleanPlayListState({commit}) {
		commit('CLEAN_PLAY_LIST_STATE')
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}