const getters = {
	cachedHistory: state => state.navigation.cachedHistory,
	backNum: state => state.navigation.backNum,
	forwardNum: state => state.navigation.forwardNum,

	nowPlayMusic: state => state.songs.nowPlayMusic,
	list: state => state.songs.musicList.list,
	listStatus: state => state.songs.musicList.listStatus
}

export default getters