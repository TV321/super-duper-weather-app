const button = document.querySelector('button')
const userLocation = document.querySelector('.location')
const icon = document.querySelector('.icon img')
const info = document.querySelector('.main-info')
const table = document.querySelector('tbody')
const alert = document.querySelector('.alert')
const forecast = document.querySelector('.forecast')

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
    return data
}

const filterForecast = (data) => {
    const fullDate = new Date()
    const date = fullDate.toLocaleDateString()

    const filteredList = data.list.filter(item =>{
        const time = item.dt * 1000
        const foreFullDate = new Date(time)
        const foreDate = foreFullDate.toLocaleDateString()

        return foreDate !== date && item.dt_txt.includes('12:00:00')
    })
    console.log(filteredList)
    return filteredList
}

const forecastUI = (data) => {
    let rows = ``
    data.forEach(item => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const time = item.dt * 1000
        const date = new Date(time)
        const dayIndex = date.getDay()
        const day = days[dayIndex]
        const row = `
        <tr>
            <td>${ day }</td>
            <td><img src="http://openweathermap.org/img/wn/${ item.weather[0].icon }@2x.png"></td>
            <td>${ item.main.temp } &#8451</td>
        </tr>
        `
        rows += row
    })
    forecast.innerHTML = `
        <tbody>
            ${ rows }
        </tbody>
    `
}

button.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude.toFixed(2)
        let long = position.coords.longitude.toFixed(2) 

        userLocation.innerHTML = `
            <p>Latitude: ${ lat }</p>
            <p>Longitude: ${ long }</p>            
        `
        getCity(lat, long)
            .then(data => updateUI(data))
            .then(data => getForecast(data.id))
            .then(data => filterForecast(data))
            .then(data => forecastUI(data))

    })
})

