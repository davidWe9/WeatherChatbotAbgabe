const WeatherForcast = 'http://api.openweathermap.org/data/2.5/forecast?id=2825297&appid=e3b561757bafc55f9075e613caf26f7b&lang=de&units=Metric';
const WeatherData = 'https://api.openweathermap.org/data/2.5/weather?id=2825297&appid=e3b561757bafc55f9075e613caf26f7b&lang=de&units=Metric';

export let WeatherDataForecast;
export let WeatherDataToday;
export let WeatherData7days;

export class OpenWeather {
  static async setDataForecast() {
    try {
      const res = await fetch(WeatherForcast);
      const data = await res.json();
      WeatherDataForecast = this.getFormatedTempTomorrow(data);
      WeatherData7days = this.getFormated7days(data);

    } catch (error) {
      console.error('Error', error);
    }
  }

  static async setWeatherDataToday() {
    try {
      const res = await fetch(WeatherData);
      const data = await res.json();
      WeatherDataToday = this.getFormatedTempCurrent(data);
    } catch (error) {
      console.error('Error', error);
    }
  }


static getFormatedTempCurrent(data) {
  if (!data || !data.main || !data.weather) {
    return 'Error: Invalid data format';
  }
  return `In Stuttgart sind es ${data.main.temp} °C <br>
    Gefühlt wie: ${data.main.feels_like} °C 
    (${data.weather[0].description})`;
}

static getFormatedTempTomorrow(data) {
    console.log(data)
  if (!data || !data.list || !data.list[0] || !data.list[0].weather) {
    return 'Error: Invalid data format';
  }
  return `In Stuttgart wird es morgen ${data.list[8].main.temp_max} °C<br>
    (${data.list[8].weather[0].description})`;
}

static getFormated7days(data){
     if (!data || !data.list || !data.list[0] || !data.list[0].weather) {
    return 'Error: Invalid data format';
  }
     console.log(data);
  return `Wettervorhersage für kommende Woche: <br>
        ${data.list[0].dt_txt}      ${data.list[0].main.temp_max} °C
    (${data.list[0].weather[0].description})
    
        ${data.list[8].dt_txt}      ${data.list[8].main.temp_max} °C
    (${data.list[8].weather[0].description})

   ${data.list[16].dt_txt}      ${data.list[16].main.temp_max} °C
    (${data.list[16].weather[0].description})
    
    
       ${data.list[24].dt_txt}      ${data.list[24].main.temp_max} °C
    (${data.list[24].weather[0].description})
    
       ${data.list[32].dt_txt}      ${data.list[32].main.temp_max} °C
    (${data.list[32].weather[0].description})
    
    ${data.list[39].dt_txt}      ${data.list[39].main.temp_max} °C
    (${data.list[39].weather[0].description})`;
}
}
