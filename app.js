const button = document.querySelector('button')
let userLocation = document.querySelector('.location')
const icon = document.querySelector('.icon img')
const info = document.querySelector('.main-info')

const key = "71c4ce3c29929e4460d9506740399393"

const getData = async (lat, long) => {
    const base = `https://api.openweathermap.org/data/2.5/weather?`
    const query = `units=metric&lat=${ lat }&lon=${ long }&appid=${ key }`

    const data = await fetch(base + query)
    const response = await data.json()
    return response
}

const updateUI = async (data) => {
    const html = `
        <h3 class="card-title">${ data.name }</h5>

        <h5 class="card-subtitle mb-2 text-muted">${ data.weather[0].description }</h6>
        <h3 class="card-title">${ data.main.temp } &#8451</h3>
    `
    info.innerHTML = html
    icon.setAttribute('src', `http://openweathermap.org/img/wn/${ data.weather[0].icon }@2x.png`)
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