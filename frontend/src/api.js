export const getWeatherData = async (cityName) => {
    const response = await fetch(
         `https://weather-app-api-lvr0.onrender.com/api/weather?city=${cityName}`
    );

    const data = await response.json();

    if (!response.ok) {
throw new Error(data.error.message);    }

    return data;
};