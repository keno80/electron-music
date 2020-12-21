const getters = {
	cachedHistory: state => state.navigation.cachedHistory,
	backNum: state => state.navigation.backNum,
	forwardNum: state => state.navigation.forwardNum,

	nowPlayMusic: state => state.songs.nowPlayMusic
}

export default getters