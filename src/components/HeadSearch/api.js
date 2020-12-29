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

	//搜索建议接口
	getSearchSuggest(keywords) {
		return axios({
			url: `${baseUrl}/search/suggest`,
			method: 'get',
			params: {
				keywords
			}
		})
	}
}