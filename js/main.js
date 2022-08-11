const form = document.getElementById('form');
const buscarCiudad = document.querySelector('.search-input');
const cardContainer = document.querySelector('.card-container');
const ingresarCity = document.querySelector('.wait');
 let ciudades = JSON.parse(localStorage.getItem('ciudades')) || [];

const saveLocalStorage = (lista) => {
    localStorage.setItem('ciudades', JSON.stringify(lista))
 }
const renderCity = city =>{
    const imagenName = city.weather[0].icon;
    return `
    <div class="card-clima animate">
    <i class="fa-solid fa-x close" data-id="${city.id}"></i>
    <div class="clima-info">
      <h2 class="info-title">${city.name}</h2>
      <p class="info-subtitle">${city.weather[0].description}</p>
      <div class="info-temp">
        <span class="temp">${convertGrados(city.main.temp)}°</span>
        <span class="st">${convertGrados(city.main.feels_like)}° ST</span>
      </div>
    </div>
    <div class="clima-img">
      <img src="http://openweathermap.org/img/wn/${imagenName}@2x.png" alt="" class="img-icon" />
    </div>
    <div class="clima-temp">
      <div class="clima-max-min">
        <span class="clima-max"
          ><i class="fa-solid fa-arrow-up-long"></i>Max:${convertGrados(city.main.temp_max)}</span
        >
        <span class="clima-min"
          ><i class="fa-solid fa-arrow-down-long"></i>Min:${convertGrados(city.main.temp_min)}</span
        >
      </div>
      <span class="clima-humedad">${city.main.humidity} Humedad</span>
    </div>
  </div>
    `
};
const renderListaCity = lista =>{
    cardContainer.innerHTML = lista.map(city => renderCity(city)).join('');
};
const searchCity = async e =>{
    e.preventDefault();
    const searchedCity = buscarCiudad.value.trim();
    // console.log(searchedCity);
    if(searchedCity === ''){
        alert('Ingresa una Ciudad');
        return;
    }
    const nogaCities = await buscarCity(searchedCity);
    // console.log(nogaCities)
    if(ciudades.some(city => city.id === nogaCities.id)){
        alert('Ya buscaste esa Ciudad');
        form.reset();
        return
    };
    ciudades = [nogaCities, ... ciudades];
    renderListaCity(ciudades);
    saveLocalStorage(ciudades);
    hiddenMsn(ciudades)
    form.reset(); 
};
const removerCity = e =>{
    if( !e.target.classList.contains('close')) 
    return;
    const filterId = parseInt(e.target.dataset.id);
    if(window.confirm('¿Esta seguro que desea borrala?')){
        ciudades = ciudades.filter(city => city.id !== filterId);
        renderListaCity(ciudades);
        saveLocalStorage(ciudades);
        hiddenMsn(ciudades)
    }
}
const hiddenMsn = lista =>{
    if(lista.lenght !== 0){
        ingresarCity.classList.add('hidden');
        return
    }
    ingresarCity.classList.remove('hidden')
}
const climaApp = () => {
    // renderListaCity(ciudades)
    hiddenMsn(ciudades)
    form.addEventListener('submit', searchCity);
    cardContainer.addEventListener('click', removerCity)
};
climaApp()
const convertGrados = kelvin =>{
    celsius = Math.round(kelvin - 273.15);
    return celsius;
}