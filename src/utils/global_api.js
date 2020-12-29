import axios from './http'
import {baseUrl} from "./http";

export default {
	// 检查音乐是否可用
	checkMusicAvailable(id) {
		return axios({
			url: `${baseUrl}/check/music`,
			method: 'get',
			params: {
				id
			}
		})
	},

	//获取音乐详情
	getMusicDetail(ids) {
		return axios({
			url: `${baseUrl}/song/detail`,
			method: 'get',
			params: {
				ids
			}
		})
	},

	//搜索接口
	search(offset, size, keywords, type) {
		return axios({
			url: `${baseUrl}/cloudsearch`,
			method: 'get',
			params: {
				offset,
				limit: size,
				keywords,
				type
			}
		})
	},

	//获取音乐url
	getMusicUrl(id) {
		return axios({
			url: `${baseUrl}/song/url`,
			method: 'get',
			params: {
				id
			}
		})
	},

	//获取歌词
	getMusicLyric(id) {
		return axios({
			url: `${baseUrl}/lyric`,
			method: 'get',
			params: {
				id
			}
		})
	}
}