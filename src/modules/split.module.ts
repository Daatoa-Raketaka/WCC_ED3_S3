import gsap from 'gsap'
import SplitType from 'split-type'

export function initSplit() {
    const text = new SplitType('.banner h1', { types: 'chars' })

    gsap.from(text.chars, {
        scrollTrigger: text.chars,
        opacity: 0,
        translateX: 1000,
        duration: 0.8,
        stagger: { amount: 0.5 },
    })

    /* gsap.to(text.chars, {
        scrollTrigger: text.chars,
        opacity: 0,
        translateX: 1000,
        duration: 0.8,
        stagger: { amount: 0.5 },
    }) */

    // gsap.from(document.)
}