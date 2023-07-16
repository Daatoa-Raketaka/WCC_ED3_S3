import { initLang } from './modules/lang.module'
import { initSplit } from './modules/split.module'
import { initSwiper } from './modules/swiper.module'
import { init } from 'aos'
import './style.scss'

/* Navbar choice */
const navbarChoiceBtn = document.querySelector('.navbar>.right-side>.portfolio-choice>.icon') as HTMLElement
const navbarChoice = document.querySelector('.navbar>.choice-swipe') as HTMLElement

navbarChoiceBtn.addEventListener('click', () => { navbarChoice.classList.toggle('active') })

/* Custom cursor */
const customCursor = document.querySelector('.custom-cursor') as HTMLElement

window.addEventListener('mousemove', (e: MouseEvent) => {
  customCursor.style.left = `${e.pageX}px`
  customCursor.style.top = `${e.pageY}px`
  customCursor.style.transform = 'translate(-50%, -50%) rotateZ(45deg)'
})

window.addEventListener('load', () => {
  const loading = document.querySelector('.loading') as HTMLElement
  loading.classList.add('load-gg')

  const overlay = document.querySelector('.overlay') as HTMLElement
  overlay.classList.add('loaded')

  const onLoaded = () => {
    loading.style.display = 'none'
    overlay.style.display = 'none'
    overlay.removeEventListener('animationend', onLoaded)
  }

  overlay.addEventListener('animationend', onLoaded)

  initLang()
  initSplit()
  initSwiper()
  init({
    duration: 500
  })
})