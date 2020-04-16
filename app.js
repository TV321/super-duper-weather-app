const button = document.querySelector('button')
const userLocation = document.querySelector('.location')
const icon = document.querySelector('.icon img')
const info = document.querySelector('.main-info')
const accord = document.querySelector('.accordion')
const table = document.querySelector('tbody')
const alert = document.querySelector('.alert')

const key = "71c4ce3c29929e4460d9506740399393"

const getData = async (lat, long) => {
    const base = `https://api.openweathermap.org/data/2.5/weather?`
    const query = `units=metric&lat=${ lat }&lon=${ long }&appid=${ key }`

    const data = await fetch(base + query)
    const response = await data.json()
    return response
}

const mainInfoUpdate = (data) => {
    const html = `
    <h3 class="card-title">${ data.name }</h5>

    <h5 class="card-subtitle mb-2 text-muted">${ data.weather[0].description }</h6>
    <h3 class="card-title">${ data.main.temp } &#8451</h3>
    `
    info.innerHTML = html
    icon.setAttribute('src', `http://openweathermap.org/img/wn/${ data.weather[0].icon }@2x.png`)
}
const detailsUpdate = (data) => {
    const sunrise = new Date(data.sys.sunrise * 1000)
    const sunset = new Date(data.sys.sunset * 1000)
    const date = new Date(data.dt * 1000)
    const html2 = `
        <tr>
            <td>Sunrise:</td>
            <td>${ sunrise.toLocaleTimeString() }</td>
        </tr>
        <tr>
            <td>Sunset:</td>
            <td>${ sunset.toLocaleTimeString() }</td>
        </tr>
        <tr>
            <td>Pressure:</td>
            <td>${ data.main.pressure } hPa</td>
        </tr>
        <tr>
            <td>Humidity:</td>
            <td>${ data.main.humidity } %</td>
        </tr>
    `
    table.innerHTML = html2
    alert.innerText = date.toLocaleDateString()
}

const updateUI = async (data) => {
    mainInfoUpdate(data)
    detailsUpdate(data)
}

button.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude.toFixed(2)
        let long = position.coords.longitude.toFixed(2) 

        userLocation.innerHTML = `
            <p>Latitude: ${ lat }</p>
            <p>Longitude: ${ long }</p>            
        `
        getData(lat, long)
            .then(data => updateUI(data))
    })
})

accord.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-link')){
        const elementId = e.target.getAttribute('data-target')
        const toggleElement = document.querySelector(elementId)
        toggleElement.classList.toggle('show')
    }
})


