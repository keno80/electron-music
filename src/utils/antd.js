import {
	AutoComplete,
	Avatar,
	Button,
	Col,
	Divider,
	Drawer,
	Dropdown,
	Empty,
	Icon,
	Input,
	Layout,
	List,
	Menu,
	PageHeader,
	Pagination,
	Progress,
	Row,
	Slider,
	Spin,
	Tabs,
	Tag,
	Tooltip
} from "ant-design-vue";

const antd = {
	install: (vue => {
		vue.use(AutoComplete)
		vue.use(Avatar)
		vue.use(Button)
		vue.use(Col)
		vue.use(Divider)
		vue.use(Drawer)
		vue.use(Dropdown)
		vue.use(Empty)
		vue.use(Icon)
		vue.use(Input)
		vue.use(Layout)
		vue.use(List)
		vue.use(Menu)
		vue.use(PageHeader)
		vue.use(Pagination)
		vue.use(Progress)
		vue.use(Row)
		vue.use(Slider)
		vue.use(Spin)
		vue.use(Tabs)
		vue.use(Tag)
		vue.use(Tooltip)
	})
}

export default antd