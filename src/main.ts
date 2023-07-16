import { initLang } from './modules/lang.module'
import { initSplit } from './modules/split.module'
import { initSwiper } from './modules/swiper.module'
import './style.scss'
import { initAnimation, initOnScrollParallax } from './modules/anim.module'
import { initScroll } from './modules/scroll.module'

/* Navbar choice */
const languageBtn = document.querySelector('#language') as HTMLElement
const languagesContainer = document.querySelector('#language>.multi') as HTMLElement
const languages = document.querySelectorAll('#language>.multi p') as NodeList



languageBtn.addEventListener('click', () => {
  languagesContainer.classList.toggle('active')
})

languages.forEach(lang => {
  (lang as HTMLElement).addEventListener('click', () => {
    (document.querySelector('html') as HTMLHtmlElement).setAttribute('lang', (lang as HTMLElement).classList[0]);
    initLang()
  })
})

/* Custom cursor */
const customCursor = document.querySelector('.custom-cursor') as HTMLElement

window.addEventListener('mousemove', (e: MouseEvent) => {
  customCursor.style.left = `${e.pageX}px`
  customCursor.style.top = `${e.pageY}px`
  customCursor.style.transform = 'translate(-50%, -50%) rotateZ(45deg)'

  if ((e.target as HTMLElement).classList.contains('link')) customCursor.classList.add('hover-link')
  else customCursor.classList.remove('hover-link')
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
  initSwiper()
  initScroll()
  initOnScrollParallax()
  initAnimation()
  initSplit()
})