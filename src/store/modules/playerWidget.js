import lodash from "lodash";

const state = {
	nowPlayMusic: {},  //当前播放的音乐详情
	nowPlayMusicId: '',  //当前播放的音乐ID  -  音乐详情将通过id获得
	Lyric: [],
	LyricIndex: 0,
	musicList: {
		listStatus: false,
		list: []
	},
	playStatus: false,  //false为暂停   true为正在播放
	playType: 0,  //播放模式  0 - 顺序播放 1 - 列表循环 2 - 单曲循环 3 - 随机
	musicDetail: {
		status: false  //歌曲歌词页面开关状态   false为关闭  true为开启
	}
}

const mutations = {
	NOW_PLAY_MUSIC_ID: (state, id) => {
		state.nowPlayMusicId = id
	},
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
	//存储单首音乐到正在播放列表
	ADD_PLAY_LIST_MUSIC: (state, music) => {
		state.musicList.list.push(music)
	},
	//存储多首音乐到正在播放列表  -  来自歌单详情页的操作
	ADD_MULTI_TO_PLAY_LIST_MUSIC: (state, info) => {
		console.log(info.musics);
		//根据type判断是添加到播放列表还是播放全部
		switch (info.type) {
			case 'add':
				//如果是添加到播放列表，先判断当前播放列表是否为空
				//如果为空，直接将歌单音乐添加到播放列表
				if (state.musicList.list.length === 0) {
					state.musicList.list = info.musics
					//添加到播放列表以后，判断当前的播放模式来自动播放音乐，随机模式与其他模式处理不相同
					let playIndex = null
					if (state.playType === 3) {
						playIndex = Math.floor(Math.random() * state.musicList.list.length)
					} else {
						playIndex = 0
					}
					state.nowPlayMusicId = state.musicList.list[playIndex].id
				} else {
					//如果播放列表不为空，则将歌单歌曲添加到当前播放音乐的后面
					console.log(lodash.findIndex(state.musicList.list, state.nowPlayMusic));
				}
		}
	},
	REFRESH_PLAY_STATUS: (state, status) => {
		state.playStatus = status
	},
	SAVE_PLAY_TYPE: (state, type) => {
		state.playType = type
		console.log(state.playType);
	},
	TOGGLE_DETAIL_STATUS: (state) => {
		state.musicDetail.status ? state.musicDetail.status = false : state.musicDetail.status = true
	},
	CLEAN_PLAY_LIST: (state) => {
		state.nowPlayMusic = {}
		state.nowPlayMusicId = ''
		state.musicList.list = []
		state.playStatus = false
		state.musicDetail.status = false

		//用于桌面歌词浮窗
		localStorage.removeItem('lyricFloating')
		localStorage.removeItem('audioCurrentTime')
	},
}

const actions = {
	nowPlayMusicId({commit}, id) {
		commit('NOW_PLAY_MUSIC_ID', id)
	},
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
	addMultiToPlayListMusic({commit}, info) {
		commit('ADD_MULTI_TO_PLAY_LIST_MUSIC', info)
	},
	refreshPlayStatus({commit}, status) {
		commit('REFRESH_PLAY_STATUS', status)
	},
	savePlayType({commit}, type) {
		commit('SAVE_PLAY_TYPE', type)
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