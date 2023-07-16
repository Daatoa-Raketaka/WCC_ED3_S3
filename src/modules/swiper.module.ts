import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

export function initSwiper() {
    new Swiper('.swiper', {
      // Optional parameters
      direction: 'horizontal',
      speed: 500,
    
      effect: 'cube',
      loop: true
    });
}