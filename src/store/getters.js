const getters = {
	cachedHistory: state => state.navigation.cachedHistory,
	backNum: state => state.navigation.backNum,
	forwardNum: state => state.navigation.forwardNum,

	//底部播放控件
	nowPlayMusic: state => state.playerWidget.nowPlayMusic,
	list: state => state.playerWidget.musicList.list,
	listStatus: state => state.playerWidget.musicList.listStatus,
	playStatus: state => state.playerWidget.playStatus,
	detailStatus: state => state.playerWidget.musicDetail.status,
	lyric: state => state.playerWidget.Lyric,
	lyricIndex: state => state.playerWidget.LyricIndex,

	//头部搜索
	searchInfo: state => state.headSearch.searchInfo,
	searchResponse: state => state.headSearch.searchResponse
}

export default getters