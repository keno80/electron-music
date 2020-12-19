import {Affix, Avatar, Button, Carousel, Divider, Dropdown, Icon, Input, Layout, Menu, Progress, Tabs} from "ant-design-vue";

const antd = {
	install: (vue => {
		vue.use(Affix)
		vue.use(Avatar)
		vue.use(Button)
		vue.use(Carousel)
		vue.use(Divider)
		vue.use(Dropdown)
		vue.use(Icon)
		vue.use(Input)
		vue.use(Layout)
		vue.use(Menu)
		vue.use(Progress)
		vue.use(Tabs)
	})
}

export default antd