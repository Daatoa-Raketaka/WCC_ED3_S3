import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

export function initSwiper() {
  const navbarChoiceBtn = document.querySelector('.navbar>.right-side>.portfolio-choice>.icon') as HTMLElement
  const navbarChoice = document.querySelector('.navbar>.choice-swipe') as HTMLElement
  const choices = navbarChoice.querySelectorAll('.choice') as NodeList
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    speed: 500,

    effect: 'cube',
    loop: true
  });

  navbarChoiceBtn.addEventListener('click', () => { navbarChoice.classList.toggle('active') })

  choices.forEach(choice => {
    (choice as HTMLElement).addEventListener('click', () => {
      navbarChoice.classList.toggle('active')
      if (choice === choices[0]){ // Daatoa
        swiper.slideTo(0, 500)
      }
      else if (choice === choices[1]) {
        swiper.slideTo(1, 500)
      }
      window.location.href = '#portfolio'
    })
  })
}