import axios from '@/utils/http'
import {baseUrl} from "@/utils/http";

export default {
	//个性推荐banner
	discovery() {
		return axios({
			url: `${baseUrl}/homepage/block/page`,
			method: 'get'
		})
	},

	//推荐歌单
	recommendSongList() {
		return axios({
			url: `${baseUrl}/personalized?limit=10`,
			method: 'get'
		})
	},

	//推荐新歌
	recommendNewSong() {
		return axios({
			url: `${baseUrl}/personalized/newsong?limit=12`,
			method: 'get'
		})
	},

	//热门歌单分类标签列表
	hotMusicListTag() {
		return axios({
			url: `${baseUrl}/playlist/hot`,
			method: 'get'
		})
	},

	//歌单分类标签
	musicListTags() {
		return axios({
			url: `${baseUrl}/playlist/catlist`,
			method: 'get'
		})
	},

	// 精品歌单标签列表
	HQMusicListTags() {
		return axios({
			url: `${baseUrl}/playlist/highquality/tags`,
			method: 'get'
		})
	},

	//歌单列表（网友精选碟）
	musicList(cat, limit, order) {
		return axios({
			url: `${baseUrl}/top/playlist`,
			method: 'get',
			params: {
				cat,
				limit,
				order
			}
		})
	},

	// 精品歌单列表
	HQMusicList(cat, limit) {
		return axios({
			url: `${baseUrl}/top/playlist/highquality`,
			method: 'get',
			params: {
				cat,
				limit
			}
		})
	},

	//电台banner
	djBanner() {
		return axios({
			url: `${baseUrl}/dj/banner`,
			method: 'get'
		})
	},

	//电台分类
	djCategory() {
		return axios({
			url: `${baseUrl}/dj/catelist`,
			method: 'get'
		})
	},

	//电台个性推荐
	djRecommend() {
		return axios({
			url: `${baseUrl}/dj/personalize/recommend?limit=5`,
			method: 'get'
		})
	},

	//电台分类推荐
	djTypeRecommend(type) {
		return axios({
			url: `${baseUrl}/dj/recommend/type`,
			method: 'get',
			params: {
				type
			}
		})
	},

	//类别热门电台
	djTypeHot(cateId) {
		return axios({
			url: `${baseUrl}/dj/radio/hot`,
			method: 'get',
			params: {
				cateId
			}
		})
	},

	//电台详情
	djDetail(rid) {
		return axios({
			url: `${baseUrl}/dj/detail`,
			method: 'get',
			params: {
				rid
			}
		})
	},

	//电台节目
	djPrograms(rid) {
		return axios({
			url: `${baseUrl}/dj/program`,
			method: 'get',
			params: {
				rid
			}
		})
	},

	//电台订阅者列表
	djSubscriber(id) {
		return axios({
			url: `${baseUrl}/dj/subscriber`,
			method: 'get',
			params: {
				id
			}
		})
	},

	//所有榜单
	allTopList() {
		return axios({
			url: `${baseUrl}/toplist`,
			method: 'get'
		})
	},

	topListDesc() {
		return axios({
			url: `${baseUrl}/toplist/detail`,
			method: 'get'
		})
	},

	//歌手分类列表
	artistsList(type, area, initial) {
		return axios({
			url: `${baseUrl}/artist/list`,
			method: 'get',
			params: {
				type,
				area,
				initial
			}
		})
	},

	//歌手详情
	artistDetail(id) {
		return axios({
			url: `${baseUrl}/artist/detail`,
			method: 'get',
			params: {
				id
			}
		})
	},

	//歌手描述
	artistDesc(id) {
		return axios({
			url: `${baseUrl}/artist/desc`,
			method: 'get',
			params: {
				id
			}
		})
	},

	//歌手专辑
	artistAlbum(id) {
		return axios({
			url: `${baseUrl}/artist/album`,
			method: 'get',
			params: {
				id
			}
		})
	},

	//歌手热门50首歌曲
	artistHotSong(id) {
		return axios({
			url: `${baseUrl}/artist/top/song`,
			method: 'get',
			params: {
				id
			}
		})
	}
}