import axios from '@/utils/http'
import {baseUrl} from "@/utils/http";

export default {
	//热搜接口
	getHotSearch() {
		return axios({
			url: `${baseUrl}/search/hot/detail`,
			method: 'get'
		})
	}
}