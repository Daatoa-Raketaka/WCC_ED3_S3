export function initScroll() {
    const intersectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const target = entry.target as HTMLElement

            const currentTransition = target.style.transition

            if (entry.isIntersecting) {
                target.classList.add(target.getAttribute('data-dr-scroll') as string)
                target.style.transitionDelay = target.getAttribute('data-dr-delay') + 'ms'
                target.style.transitionDuration = target.getAttribute('data-dr-duration') + 'ms'
            }
            else {
                target.classList.remove(target.getAttribute('data-dr-scroll') as string)
            }

            target.addEventListener('animationend', () => target.style.transition = currentTransition)
        })
    }, {
        threshold: 0.5,
        rootMargin: '80px'
    })

    document.querySelectorAll('[data-dr-scroll]').forEach(el => {        
        (el as HTMLElement).style.animationDelay = el.getAttribute('data-dr-delay') + 'ms';
        (el as HTMLElement).style.animationDuration = el.getAttribute('data-dr-duration') + 'ms'

        intersectionObserver.observe(el)
    })

    const overflowObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const target = entry.target as HTMLElement

            if (entry.isIntersecting) {
                (target.firstElementChild as HTMLElement).style.animation = target.getAttribute('data-dr-overflow') as string;
                (target.firstElementChild as HTMLElement).style.opacity = '1'
            }
            else {
                (target.firstElementChild as HTMLElement).style.animation = 'none';
                (target.firstElementChild as HTMLElement).style.opacity = '0'
            }
        })
    }, {
        threshold: 1
    })

    document.querySelectorAll('[data-dr-overflow]').forEach(el => {
        overflowObserver.observe(el)
    })
}