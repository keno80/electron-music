import {Carousel, CarouselItem, Scrollbar, Table, TableColumn} from 'element-ui'

const element = {
	install: (vue => {
		vue.use(Carousel)
		vue.use(CarouselItem)
		vue.use(Scrollbar)
		vue.use(Table)
		vue.use(TableColumn)
	})
}

export default element