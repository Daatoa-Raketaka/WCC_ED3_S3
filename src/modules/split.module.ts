import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

export function initSplit() {
    const text = new SplitType('.banner h1', { types: 'chars' })

    gsap.registerPlugin(ScrollTrigger)

    gsap.from(text.chars, {
        opacity: 0,
        translateX: 1000,
        duration: 0.8,
        delay: 1,
        stagger: { amount: 0.5 },
    })

    gsap.fromTo(text.chars, {
        opacity: 1,
        translateX: 0
    }, {
        scrollTrigger: {
            trigger: text.chars,
            scrub: 2,
            start: 'bottom 20%'
        },
        opacity: 0,
        translateX: '100%',
        duration: 0.5,
        stagger: { amount: 0.5 },
    })

    // gsap.from(document.)
}