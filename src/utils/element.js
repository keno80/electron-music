import {Carousel, CarouselItem, Scrollbar} from 'element-ui'

const element = {
	install: (vue => {
		vue.use(Carousel)
		vue.use(CarouselItem)
		vue.use(Scrollbar)
	})
}

export default element