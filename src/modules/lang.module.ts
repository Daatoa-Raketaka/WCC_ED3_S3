export async function initLang() {
    const data = await (await fetch('/lang.json')).json()
    const lang = document.documentElement.lang
    const elements = document.querySelectorAll('[data-lang]') as NodeListOf<HTMLElement>

    elements.forEach(el => el.innerText = data[el.getAttribute('data-lang') as string][lang])
}