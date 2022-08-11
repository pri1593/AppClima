const key = '7440f63bf5959fa498576566de9f5d1d';
const buscarCity = async city => {
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

    const query = `?q=${city}&APPID=${key}`;
    const response = await fetch(baseURL + query);
    const data = await response.json();
    // console.log(data);
    

    return data
}
