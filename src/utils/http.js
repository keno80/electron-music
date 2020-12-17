import axios from 'axios'

const instance = axios.create({
	timeout: 30000
})

export const baseUrl = 'https://musicapi.chkai.xyz'

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default instance