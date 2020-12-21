import {Affix, Avatar, Button, Col, Divider, Dropdown, Icon, Input, Layout, Menu, Row, Slider, Tabs} from "ant-design-vue";

const antd = {
	install: (vue => {
		vue.use(Affix)
		vue.use(Avatar)
		vue.use(Button)
		vue.use(Col)
		vue.use(Divider)
		vue.use(Dropdown)
		vue.use(Icon)
		vue.use(Input)
		vue.use(Layout)
		vue.use(Menu)
		vue.use(Row)
		vue.use(Slider)
		vue.use(Tabs)
	})
}

export default antd