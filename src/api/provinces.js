// const getProvincesNameData = async (provincesName) => {
//   try {
//     const response = await fetch(
//       `https://turkiyeapi.dev/api/v1/provinces?name=${provincesName} `
//     );
//     if (!response.ok) {
//       throw new Error("Weather data could not be fetched");
//     }
//     const data = await response.json();
//     return data.data[0].name;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export default getProvincesNameData;
