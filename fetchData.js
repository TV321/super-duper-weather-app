const key = "71c4ce3c29929e4460d9506740399393"

const getData = async (lat, long) => {
    const base = `https://api.openweathermap.org/data/2.5/weather?`
    const query = `units=metric&lat=${ lat }&lon=${ long }&appid=${ key }`

    const data = await fetch(base + query)
    const response = await data.json()
    return response
}