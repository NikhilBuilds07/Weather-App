export const getWeatherData = async (cityName) => {
    const response = await fetch(
        `http://localhost:5000/api/weather?city=${cityName}`
    );

    const data = await response.json();

    if (!response.ok) {
throw new Error(data.error.message);    }

    return data;
};