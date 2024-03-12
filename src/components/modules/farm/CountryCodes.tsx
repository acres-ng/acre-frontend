// export const countryCodes: string[] = [
//     'US', // United States
//     'CA', // Canada
//     'GB', // United Kingdom
//     'NG',
//     // Add more country codes as needed
//   ];
  

//   <Dropdown
//   {...register("country", {
//     required: "Country is required",
//   })}
//   value={formData.country}
//   onChange={handleCountryChange}
//   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//   options={countryData}
// />



// <Dropdown
// {...register("state", {
//   required: "State is required",
// })}
// value={formData.state}
// onChange={(e) =>
//   setFormData({
//     ...formData,
//     state: e.target.value,
//   })
// }


// const getStateData = (countryCode: string) => {
//     const states = State.getStatesOfCountry(countryCode).map(state => ({
//       value: state.name,
//       displayValue: `${state.name} - ${state.isoCode}`
//     }));
  
//     return states;
//   };


//   const countryData = CountryType.getAllCountries().map((country) => ({
//     value: country.name,
//     displayValue: `${country.name} - ${country.isoCode}`,
//   }));