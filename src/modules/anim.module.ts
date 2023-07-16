import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initAnimation() {
    const elements = document.querySelectorAll('[data-dr-anim]') as NodeListOf<HTMLElement>
    elements.forEach(el => el.style.animation = el.getAttribute('data-dr-anim') as string)
}

export function initOnScrollParallax() {
    document.body.addEventListener('scroll', () => {
        const portfolio = document.querySelectorAll('.portfolio')

        portfolio.forEach(el => {
            const elementTop = el.getBoundingClientRect().top
            const scrollPos = document.body.scrollTop - elementTop
            if (scrollPos === 0) console.log('GG')
        })
    })
}