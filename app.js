const button = document.querySelector('button')
let userLocation = document.querySelector('.location')

const apiKey = "71c4ce3c29929e4460d9506740399393"

const getData = async (lat, long) => {
    
}

button.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude
        let long = position.coords.longitude

        

        userLocation.innerHTML = `
            <p>Latitude: ${ lat }</p>
            <p>Longitude: ${ long }</p>            
        `
    })
})