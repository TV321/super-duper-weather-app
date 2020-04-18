const key = "71c4ce3c29929e4460d9506740399393"

const getCity = async (lat, long) => {
    const base = `https://api.openweathermap.org/data/2.5/weather?`
    const query = `units=metric&lat=${ lat }&lon=${ long }&appid=${ key }`

    const data = await fetch(base + query)
    const response = await data.json()
    return response
}

const getForecast = async (id) => {
    const base = `http://api.openweathermap.org/data/2.5/forecast?`
    const query = `id=${ id }&appid=${ key }&units=metric`

    const data = await fetch(base + query)
    const response = await data.json()
    return response
}

const getCities = async (lat, long) => {
    const base = `https://api.openweathermap.org/data/2.5/find?`
    const query = `lat=${ lat }&lon=${ long }&cnt=10&appid=${ key }&units=metric`

    const data = await fetch(base + query)
    const response = await data.json()
    return response.list
}

const getCityByName = async (name) => {
    const base = `https://api.openweathermap.org/data/2.5/weather?`
    const query = `q=${ name }&appid=${ key }&units=metric`

    const data = await fetch(base + query)
    const response = await data.json()
    return response.coord
}