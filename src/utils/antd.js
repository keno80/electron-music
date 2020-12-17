import {Avatar, Button, Divider, Dropdown, Icon, Input, Layout, Menu, Tabs} from "ant-design-vue";

const antd = {
	install: (vue => {
		vue.use(Avatar)
		vue.use(Button)
		vue.use(Divider)
		vue.use(Dropdown)
		vue.use(Icon)
		vue.use(Input)
		vue.use(Layout)
		vue.use(Menu)
		vue.use(Tabs)
	})
}

export default antd