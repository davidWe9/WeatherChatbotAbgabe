//@author David Wentsch
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
  const forecast = data.list.reduce((acc, item, index) => {
    if (index % 8 === 0) {
      const date = item.dt_txt.split(' ')[0];
      acc += `${date} <br>     ${item.main.temp_max} °C (${item.weather[0].description})<br>`;
    }
    return acc;
  }, '');
  return `Wettervorhersage für kommende Woche: <br>\n${forecast}`;
}
}
