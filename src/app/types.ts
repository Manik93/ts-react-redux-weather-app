interface mainObject {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

//geocoding
export type OptionType = {
  value: string;
  label: string;
};

//current weather
export type WeatherData = {
  coord: { lon: string; lat: string };
  weather: [{ id: number; main: string; description: string; icon: string }];
  main: mainObject;
  sys: { country: string; sunrise: number; sunset: number };
  visibility: number;
  wind: { speed: number; deg: number; gust: number };
  clouds: { all: number };
  rain: { hour: number };
  snow: { hour: number };
  id: number;
  name: string;
};

//forecast
interface ForecastItem {
  main: mainObject;
  clouds: { all: number };
  weather: [{ id: number; main: string; description: string; icon: string }];
  wind: { speed: number; deg: number; gust: number };
}

export type ForecastData = {
  city: {
    id: number;
    name: string;
    coord: { lat: number; lon: number };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
  list: Array<ForecastItem>;
};
