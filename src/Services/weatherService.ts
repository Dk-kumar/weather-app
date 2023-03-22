import { SearchParams } from "../Types";

const API_KEY: string = "8220b444375eebfda76cee49d4173c7b";
const BASE_URL: string = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType: string, searchParams: any) => {
  const url: any = new URL(`${BASE_URL}/${infoType}`);
  url.search = new URLSearchParams({ ...searchParams, appID: API_KEY });

  return fetch(url).then((res) => res.json());
};

export const getformattedWeatherData = async (searchParams: SearchParams) => {
  const formattedCurrantWeatherData: any = await getWeatherData(
    "weather",
    searchParams
  );

  return formattedCurrantWeatherData;
};

export const getForecastData = async (searchParams: SearchParams) => {
  const formattedForecastData: any = await getWeatherData(
    "forecast",
    searchParams
  );
  return formattedForecastData;
};

export const getImage = (code) => {
  return `http://openweathermap.org/img/wn/${code}@2x.png`;
};
