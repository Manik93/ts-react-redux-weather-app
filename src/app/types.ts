export type OptionType = {
  value: string;
  label: string;
};

export type WeatherData = {
  coord?: { lon: string; lat: string };
  weather?: [{ id: number; main: string; description: string; icon: string }];
  main?: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility?: number;
  wind?: { speed: number; deg: number; gust: number };
  clouds?: { all: number };
  rain?: {};
  snow?: {};
  id?: number;
  name?: string;
};

export {};
