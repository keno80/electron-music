const state = {
	detail: {},  //歌单详情、简介
	songs: [],  //此歌单包含的歌曲
}

const mutations = {
	SAVE_MUSIC_LIST_DETAIL: (state, info) => {
		state.detail = info
	},
	SAVE_MUSIC_LIST_SONGS: (state, songs) => {
		state.songs = songs
	}
}

const actions = {
	saveMusicListDetail({commit}, info) {
		commit('SAVE_MUSIC_LIST_DETAIL', info)
	},
	saveMusicListSongs({commit}, songs) {
		commit('SAVE_MUSIC_LIST_SONGS', songs)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}