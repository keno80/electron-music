import {Button, Carousel, CarouselItem, Scrollbar} from 'element-ui'

const element = {
	install: (vue => {
		vue.use(Button)
		vue.use(Carousel)
		vue.use(CarouselItem)
		vue.use(Scrollbar)
	})
}

export default element