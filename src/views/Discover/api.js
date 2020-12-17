import axios from '@/utils/http'
import {baseUrl} from "@/utils/http";

export default {
	discovery() {
		return axios({
			url: `${baseUrl}/homepage/block/page`,
			method: 'get'
		})
	}
}