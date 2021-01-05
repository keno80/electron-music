import Vue from 'vue'
import VueRouter from 'vue-router'
import Overlay from '@/Overlay/index'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/discover',
		component: Overlay,
		children: [
			{
				path: 'discover',
				name: 'discover',
				component: () => import('@/views/Discover/index'),
				meta: {title: '发现音乐'}
			},
			{
				path: 'personalFM',
				name: 'personalFM',
				component: () => import('@/views/PersonalFM/index'),
				meta: {title: '私人FM'}
			},
			{
				path: 'search',
				name: 'search',
				component: () => import('@/views/Search/index'),
				meta: {title: '搜索'},
				hidden: true
			},
			{
				path: 'music_list',
				name: 'music_list',
					component: () => import('@/views/MusicListDetail/index'),
				meta: {title: '歌单详情'}
			},
		]
	},
	{
		path: '/desk/lyric',
		name: 'desk_lyric',
		component: () => import('@/views/DeskLyric/index'),
		meta: {title: '桌面歌词'},
		hidden: true
	}
]

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

export default router
