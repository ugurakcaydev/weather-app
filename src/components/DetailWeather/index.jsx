import { useEffect, useState } from "react";
import getWeatherData from "../../api/weather";

const getWeatherIcon = (weatherType) => {
  switch (weatherType) {
    case "rain":
      return "/image/rain.png";
    case "snow":
      return "/image/snow.png";
    case "sunny":
      return "/image/sunny.png";
    case "thunder":
      return "/image/thunder.png";
    case "clear":
      return "/image/cloudy.png";
    case "partially-cloudy":
      return "/image/partially-cloudy.png";
    // Diğer hava durumu türleri için gerekli ikon yollarını buraya ekleyin
    default:
      return "/image/partially-cloudy.png"; // Varsayılan ikon
  }
};
// eslint-disable-next-line react/prop-types
function DetailWeather({ cityName }) {
  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    getWeatherData(cityName)
      .then((data) => setWeatherData(data))
      .catch((error) => console.error(error));
  }, []);
  if (!weatherData) {
    return (
      <div className="card w-full h-[304px] rounded-xl p-3 bg-[#16161f] ">
        <div className="w-full h-full rounded-lg bg-[url('/image/Background.png')] p-3 flex flex-col justify-center items-center">
          Loading
        </div>
      </div>
    );
  }
  const currentDay = weatherData.currentConditions;

  return (
    <>
      <div className="card w-full h-[304px] rounded-xl p-3 bg-[#16161f] ">
        <div className="w-full h-full rounded-lg bg-[url('/image/Background.png')] p-3 flex flex-col justify-between items-start">
          {/* Info */}
          <div className="flex flex-col items-start justify-start gap-y-0.5 text-[#FAFAFA]">
            <div className="text-base font-bold ">
              {weatherData.resolvedAddress}
            </div>
            <div className="flex items-center justify-start text-xs font-normal gap-x-1">
              <div>Monday,</div>
              <div>May 15,</div>
              <div>May 15</div>
            </div>
          </div>
          {/* Weather */}
          <div className="w-full gap-x-2 flex items-center justify-between">
            <div className="w-full flex flex-col justify-start items-start gap-y-1 text-white">
              <div className="text-[43px] font-bold  ">{currentDay.temp}°C</div>
              {/* {Detail} */}
              <div className="flex flex-col gap-y-1">
                <div className="font-bold text-base ">
                  {weatherData.days[0].tempmin}°C /{" "}
                  {weatherData.days[0].tempmax}°C
                </div>
                <div className="font-normal text-sm">Few clouds</div>
              </div>
            </div>
            <img
              src="/image/Icons.png"
              className="w-[130px] h-[140px] object-contain"
              alt=""
            />
          </div>
        </div>
      </div>
      {/*Weather Detail */}
      <div className="weather-detail w-full h-fit flex flex-col gap-y-2 rounded-xl py-1 px-4 bg-[#16161f] ">
        <div className="w-full flex items-center justify-between py-3 border-b border-b-[#1C1C27]">
          <div className="flex items-center justify-center gap-x-3">
            <img
              src="/image/Icons (0).png"
              className="w-6 h-6 object-contain"
              alt=""
            />
            <div className="text-sm font-bold text-[#BFBFD4]">
              Thermal sensation
            </div>
          </div>
          <div className="text-[#fafafa] text-base font-bold">
            {currentDay.temp}°C
          </div>
        </div>
        <div className="w-full flex items-center justify-between py-3 border-b border-b-[#1C1C27]">
          <div className="flex items-center justify-center gap-x-3">
            <img
              src="/image/Icons (1).png"
              className="w-6 h-6 object-contain"
              alt=""
            />
            <div className="text-sm font-bold text-[#BFBFD4]">
              Probability of snow
            </div>
          </div>
          <div className="text-[#fafafa] text-base font-bold">
            {currentDay.snow}%
          </div>
        </div>
        <div className="w-full flex items-center justify-between py-3 border-b border-b-[#1C1C27]">
          <div className="flex items-center justify-center gap-x-3">
            <img
              src="/image/Icons (2).png"
              className="w-6 h-6 object-contain"
              alt=""
            />
            <div className="text-sm font-bold text-[#BFBFD4]">Wind speed</div>
          </div>
          <div className="text-[#fafafa] text-base font-bold">
            {weatherData.currentConditions.windspeed} km/h
          </div>
        </div>
        <div className="w-full flex items-center justify-between py-3 border-b border-b-[#1C1C27]">
          <div className="flex items-center justify-center gap-x-3">
            <img
              src="/image/Icons (3).png"
              className="w-6 h-6 object-contain"
              alt=""
            />
            <div className="text-sm font-bold text-[#BFBFD4]">Air humidity</div>
          </div>
          <div className="text-[#fafafa] text-base font-bold">
            {currentDay.humidity}%
          </div>
        </div>
        <div className="w-full flex items-center justify-between py-3">
          <div className="flex items-center justify-center gap-x-3">
            <img
              src="/image/Icons (4).png"
              className="w-6 h-6 object-contain"
              alt=""
            />
            <div className="text-sm font-bold text-[#BFBFD4]">UV Index</div>
          </div>
          <div className="text-[#fafafa] text-base font-bold">
            {currentDay.uvindex}
          </div>
        </div>
      </div>
      {/* Next Days */}
      <div className="next-days w-full h-fit flex  rounded-xl py-1 px-4 bg-[#16161f]">
        {weatherData.days.slice(1).map(
          (
            day,
            index // days dizisini slice(1) ile ilk elemanı atlayarak başlatıyoruz
          ) => {
            const date = new Date(day.datetime);

            // Date nesnesini kullanarak gün adını al
            const dayName = date.toLocaleDateString("tr-TR", {
              weekday: "short",
            });

            // İlk 3 harfi al
            const shortenedDayName = dayName.substring(0, 3);
            console.log(day.conditions);
            return (
              <div
                key={index}
                className="next-day flex flex-col items-center justify-start gap-y-1"
              >
                <div className="font-bold text-sm text-[#BFBFD4]">
                  {shortenedDayName}
                </div>
                <div className="w-[56px] h-[56px] flex items-center justify-center">
                  <img
                    src={getWeatherIcon(
                      day.conditions.toLowerCase().replace(/\s+/g, "-")
                    )}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <div className="flex flex-col items-center justify-center gap-y-1 text-sm font-bold">
                  <div className="text-[#FAFAFA]">{day.tempmax}°C</div>
                  <div className="text-[#7F7F98]">{day.tempmin}°C</div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </>
  );
}

export default DetailWeather;
