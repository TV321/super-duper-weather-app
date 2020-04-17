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
