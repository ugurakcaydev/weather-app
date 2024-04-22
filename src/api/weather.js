const baseURL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const key = "YMSL8JJQE62NU5VDUMEWGM88Y";
// const key2 ="YMSL8JJQE62NU5VDUMEWGM88Y"
const getWeatherData = async (cityName) => {
  try {
    const response = await fetch(
      `${baseURL}${cityName}/next5days?unitGroup=metric&include=days%2Ccurrent&key=${key}&contentType=json`
    );
    if (!response.ok) {
      throw new Error("Weather data could not be fetched");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getWeatherData;
