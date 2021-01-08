import lodash from "lodash";
import musicList from "@/store/modules/musicList";

const state = {
	nowPlayMusic: {},  //当前播放的音乐详情
	nowPlayMusicId: '',  //当前播放的音乐ID  -  音乐详情将通过id获得
	Lyric: [],
	LyricIndex: 0,
	playList: {
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
		state.playList.listStatus = true
	},
	CLOSE_MUSIC_LIST: (state) => {
		state.playList.listStatus = false
	},
	//存储单首音乐到正在播放列表
	ADD_PLAY_LIST_MUSIC: (state, music) => {
		state.playList.list.push(music)
	},
	//存储多首音乐到正在播放列表  -  来自歌单详情页的操作
	ADD_MULTI_TO_PLAY_LIST_MUSIC: (state, musics) => {
		state.playList.list = musics
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
		state.playList.list = []
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
	addMultiToPlayListMusic({commit}, musics) {
		commit('ADD_MULTI_TO_PLAY_LIST_MUSIC', musics)
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