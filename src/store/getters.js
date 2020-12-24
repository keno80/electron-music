const getters = {
	cachedHistory: state => state.navigation.cachedHistory,
	backNum: state => state.navigation.backNum,
	forwardNum: state => state.navigation.forwardNum,

	nowPlayMusic: state => state.playerWidget.nowPlayMusic,
	list: state => state.playerWidget.musicList.list,
	listStatus: state => state.playerWidget.musicList.listStatus,
	playStatus: state => state.playerWidget.playStatus,
	detailStatus: state => state.playerWidget.musicDetail.status,
	lyric: state => state.playerWidget.Lyric,
	lyricIndex: state => state.playerWidget.LyricIndex
}

export default getters