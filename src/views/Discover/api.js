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
	}
}