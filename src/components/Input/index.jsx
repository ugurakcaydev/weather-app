/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import provinces from "../../api/getAllProvinces";

function ComboboxInput({ setShowDetail, setCityName }) {
  const [inputValue, setInputValue] = useState("");
  // const [provincesData, setProvincesData] = useState([]);
  // const debouncedValue = useDebounce(inputValue, delay);
  const filteredProvinces =
    inputValue === "" || !provinces
      ? provinces
      : provinces.filter((province) =>
          province
            .toLocaleLowerCase("tr")
            .replace(/\s+/g, "")
            .includes(inputValue.toLocaleLowerCase("tr").replace(/\s+/g, ""))
        );

  // useEffect(() => {
  //   const getAllProvinces = async () => {
  //     try {
  //       const response = await fetch(`https://turkiyeapi.dev/api/v1/provinces`);
  //       if (!response.ok) {
  //         throw new Error("Weather data could not be fetched");
  //       }
  //       const provinces = await response.json();
  //       setProvincesData(provinces.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   getAllProvinces();
  // }, []);

  // useEffect(() => {
  //   onChange(debouncedValue);
  // }, [debouncedValue]);

  return (
    <Combobox className="w-full  bg-[#1E1E29] rounded-lg ">
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-[#1E1E29] text-left  focus:outline-none sm:text-sm">
          <Combobox.Input
            autoComplete="off"
            className="w-full h-full px-5 py-3 placeholder:text-md placeholder:text-[#7F7F98] bg-[#1E1E29] rounded-lg text-[#FAFAFA] placeholder:font-normal outline-none"
            displayValue={(country) => country.label}
            onChange={(event) => setInputValue(event.target.value)}
          />
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Combobox.Options className="absolute mt-2 max-h-56 w-full overflow-y-auto rounded-lg text-white bg-[#3B3B54] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredProvinces.length === 0 && inputValue !== "" ? (
              <div className="relative cursor-default select-none py-2 px-5 text-base ">
                Nothing found.
              </div>
            ) : (
              filteredProvinces.map((province, index) => (
                <Combobox.Option
                  key={index}
                  className={`relative flex items-center justify-start  cursor-pointer select-none py-4 px-5 ${
                    index === filteredProvinces.length - 1
                      ? ""
                      : "border-b border-b-[#1E1E29]"
                  } `}
                  value={province}
                  onClick={() => {
                    setCityName(province);
                    setShowDetail(true);
                  }}
                >
                  <span
                    className={`block truncate text-base font-normal text-[#FAFAFA] `}
                  >
                    {province}
                  </span>
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}

export default ComboboxInput;
