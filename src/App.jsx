import "./App.css";
import Navbar from "./components/Navbar";
import ComboboxInput from "./components/Input";
import DetailWeather from "./components/DetailWeather";
import { useState } from "react";

function App() {
  const [cityName, setCityName] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  return (
    <>
      {/* Navbar */}
      <Navbar />
      <div className="container mx-auto w-full h-ful flex flex-col items-center justify-start py-4 max-w-[1280px]">
        {/* py-28 ve py-4 olucak duruma göre */}
        <div className="w-[311px] flex flex-col items-center justify-start gap-y-3">
          {/* gap-y-6 ve gap-y-3 olucak duruma göre */}
          {showDetail ? (
            <DetailWeather cityName={cityName} />
          ) : (
            <>
              <div className="w-full flex flex-col items-center justify-start gap-y-2">
                <div className="flex items-center justify-center gap-x-2 text-[20px] text-[#FAFAFA] font-[700]">
                  Welcome to <span className="text-[#8FB2F5]">TypeWeather</span>
                </div>
                <div className="font-[400] font-Nunito text-sm text-[#BFBFD4] ">
                  Choose a location to see the weather forecast
                </div>
              </div>
              <ComboboxInput
                setShowDetail={setShowDetail}
                setCityName={setCityName}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
