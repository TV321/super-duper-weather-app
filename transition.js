const accord = document.querySelector('.accordion')

const toggleCollapse = (data) => {
    data.style.height = data.scrollHeight + 'px'
    data.scrollHeight = data.scrollHeight

    data.classList.toggle('show')
    data.style.height = data.classList.contains('show') ? data.scrollHeight + 'px' : 0
}

accord.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-link')){
        const elementId = e.target.getAttribute('data-target')
        const toggleElement = document.querySelector(elementId)
        toggleCollapse(toggleElement)
    }
})



let initialIndex = 1
const onClick = (n) => {
    slideOn(initialIndex += n)
}

const slideOn = (n) => {
    const slides = document.querySelectorAll('.carousel-item')

    if(n > slides.length) {initialIndex = 1}
    if(n < 1) {initialIndex = slides.length}

    slides.forEach(item => {
        item.classList.remove('active')
    })
    slides[initialIndex -1].classList.add('active')
}

slideOn(initialIndex)