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
	}
}