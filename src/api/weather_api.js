//const API_KEY = '87b78c03b40f17ad991a94cfa010b8b9';

export function loadWeather()
{
    let response = fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=Berlin&units=metric&appid=87b78c03b40f17ad991a94cfa010b8b9'
    ).then((r) => r.json())
    .then((data) => Math.round(data.main.temp))
    .catch(function(err) {  
        console.log('Fetch Error :-S', err);  
    });
    return response
}