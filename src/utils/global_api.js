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

	//获取音乐url
	getMusicUrl(id) {
		return axios({
			url: `${baseUrl}/song/url`,
			method: 'get',
			params: {
				id
			}
		})
	}
}