import axios from '@/utils/http'
import {baseUrl} from "@/utils/http";

export default {
	getHotSearch() {
		return axios({
			url: `${baseUrl}/search/hot/detail`,
			method: 'get'
		})
	}
}