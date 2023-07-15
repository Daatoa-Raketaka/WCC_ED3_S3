import { initLang } from './modules/lang.module'
import './style.scss'

/* Navbar choice */
const navbarChoiceBtn = document.querySelector('.navbar>.right-side>.portfolio-choice>.icon') as HTMLElement
const navbarChoice = document.querySelector('.navbar>.choice-swipe') as HTMLElement

navbarChoiceBtn.addEventListener('click', () => { navbarChoice.classList.toggle('active') })

/* Custom cursor */
const customCursor = document.querySelector('.custom-cursor') as HTMLElement

window.addEventListener('mousemove', (e: MouseEvent) => {
  customCursor.style.left = `${e.clientX}px`
  customCursor.style.top = `${e.clientY}px`
  customCursor.style.transform = 'translate(-50%, -50%) rotateZ(45deg)'
})

window.addEventListener('load', () => {
  initLang()
})