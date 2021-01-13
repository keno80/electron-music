const getters = {
	cachedHistory: state => state.navigation.cachedHistory,
	backNum: state => state.navigation.backNum,
	forwardNum: state => state.navigation.forwardNum,

	//应用
	scrollBar: state => state.app.scrollBar,
	tabIndex: state => state.app.tabIndex,
	detailTag: state => state.app.detailTag,

	//底部播放控件
	nowPlayMusicId: state => state.playerWidget.nowPlayMusicId,
	nowPlayMusic: state => state.playerWidget.nowPlayMusic,
	nowPlayUid: state => state.playerWidget.nowPlayUid,
	playList: state => state.playerWidget.playList.list,
	listStatus: state => state.playerWidget.playList.listStatus,
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
	musicListIds: state => state.musicList.musicListIds,
	HQMusicList: state => state.musicList.HQMusicList,
	normalOrHQ: state => state.musicList.normalOrHQ,

	//电台
	djRadiosList: state => state.djProgram.radiosList,
	programList: state => state.djProgram.programList,
	programDetail: state => state.djProgram.programDetail
}

export default getters