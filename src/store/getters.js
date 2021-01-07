const getters = {
	cachedHistory: state => state.navigation.cachedHistory,
	backNum: state => state.navigation.backNum,
	forwardNum: state => state.navigation.forwardNum,

	//底部播放控件
	nowPlayMusicId: state => state.playerWidget.nowPlayMusicId,
	nowPlayMusic: state => state.playerWidget.nowPlayMusic,
	list: state => state.playerWidget.musicList.list,
	listStatus: state => state.playerWidget.musicList.listStatus,
	playStatus: state => state.playerWidget.playStatus,
	playType: state => state.playerWidget.playType,
	detailStatus: state => state.playerWidget.musicDetail.status,
	lyric: state => state.playerWidget.Lyric,
	lyricIndex: state => state.playerWidget.LyricIndex,

	//头部搜索
	searchInfo: state => state.headSearch.searchInfo,

	//歌单
	musicListDetail: state => state.musicList.detail,
	musicList: state => state.musicList.songs,
	musicListIds: state => state.musicList.musicListIds
}

export default getters