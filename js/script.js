const apiKey = "f979434dc83a6c531085d62220c68f22";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const locationButton = document.querySelector('.another button');
const weatherIcon = document.querySelector('.weather-icon');

const wrapperr = document.querySelector('.wrapper');

async function checkWeather(city) {
     
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status === 404){
        document.querySelector('.error').style.display = "block";
        document.querySelector('.weather').style.display = "none";
    } else{
        
        let data = await response.json();
    console.log(data);

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp)  + '°C';  
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';                //inner html can updtadeour txt

    if(data.weather[0].main === 'Clouds'){
       weatherIcon.src = 'images/clouds.png';
    }else if(data.weather[0].main === 'Clear'){
        weatherIcon.src = 'images/clear.png';
    }else if(data.weather[0].main === 'Rain'){
        weatherIcon.src = 'images/rain.png';
    }else if(data.weather[0].main === 'Drizzle'){
        weatherIcon.src = 'images/drizzle.png';
    }else if(data.weather[0].main === 'Mist'){
        weatherIcon.src = 'images/mist.png';
    }
    else if(data.weather[0].main === 'Snow'){
        weatherIcon.src = 'images/snow.png';
        
    }

    document.querySelector('.weather').style.display = "block";
    document.querySelector('.error').style.display = "none";
    }
    
    
}

searchBtn.addEventListener('click', () => {
    /* checkWeather(searchBox.value); */ // Варгументе текст который приходит с инпута
    let txt = searchBox.value;
    let newTxt = txt.replace(/ /g, "");
    checkWeather(newTxt);
})

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        let txt = searchBox.value;
    let newTxt = txt.replace(/ /g, "");
    checkWeather(newTxt);
    }
  });

function geMycoordin () {
    return new Promise ((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
          ( { coords }) => {
              resolve({
                  latitude: coords.latitude,
                  longitude: coords.longitude
              })
          },

          (err) => {
              reject(err);
          }
      )
    }) 
 }


 async function getMyHome (){
   try{
      const { latitude, longitude } = await geMycoordin();
      const response = await fetch(`
      https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`);
       if(!response.ok){
          throw new Error(response.status);
       }

       const data = await response.json();

       const city = data.city;
       checkWeather(city);


   } catch(e){
      console.log(e);
   }
 }

 locationButton.addEventListener('click', () => {
    getMyHome();
})
