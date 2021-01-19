import Vue from 'vue'
import VueRouter from 'vue-router'
import Overlay from '@/Overlay/index'
import store from '@/store'

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
				meta: {title: '歌单详情'},
				hidden: true
			},
			{
				path: 'artist_detail',
				name: 'artist_detail',
				component: () => import('@/views/ArtistDetail/index'),
				meta: {title: '歌手详情'},
				hidden: true
			},
			{
				path: 'dj_programs_list',
				name: 'dj_programs_list',
				component: () => import('@/views/Discover/components/tab3-dj/djProgramsList'),
				meta: {title: '电台节目列表'},
				hidden: true
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

router.beforeEach((to, from, next) => {
	store.dispatch('app/reShowScrollBar')
	setTimeout(() => {
		store.dispatch('app/reShowScrollBar')
	}, 200)

	next()
})

export default router
