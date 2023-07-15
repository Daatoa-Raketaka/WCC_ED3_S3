import './style.scss'

/* Navbar choice */
const navbarChoiceBtn = document.querySelector('.navbar>.right-side>.portfolio-choice>.icon') as HTMLElement
const navbarChoice = document.querySelector('.navbar>.choice-swipe') as HTMLElement

navbarChoiceBtn.addEventListener('click', () => { navbarChoice.classList.toggle('active') })