import axios from '@/utils/http'
import {baseUrl} from "@/utils/http";

export default {
	//热搜接口
	getHotSearch() {
		return axios({
			url: `${baseUrl}/search/hot/detail`,
			method: 'get'
		})
	},

	//搜索接口
	search(page, size, keywords, type) {
		return axios({
			url: `${baseUrl}/cloudsearch`,
			method: 'get',
			params: {
				offset: page,
				limit: size,
				keywords,
				type
			}
		})
	}
}