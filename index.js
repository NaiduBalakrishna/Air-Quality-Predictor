const form = document.getElementById("form");
const latitudeInput = document.getElementById("latitude");
const longitudeInput = document.getElementById("longitude");
const resultContainer = document.getElementById("result");
const aqiResult = document.getElementById("aqi");
const coResult = document.getElementById("co");
const no2Result = document.getElementById("no2");
const o3Result = document.getElementById("o3");
const pm2Result = document.getElementById("pm2");
const pm10Result = document.getElementById("pm10");
const so2Result = document.getElementById("so2");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const latitude = latitudeInput.value;
    const longitude = longitudeInput.value;
    const url = `https://air-quality.p.rapidapi.com/current/airquality?lon=${longitude}&lat=${latitude}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'process.env.REACT_APP_RAPIDAPI_KEY',
            'x-rapidapi-host': 'air-quality.p.rapidapi.com'
        }
    };

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            if (result.data && result.data.length > 0) {
                let readings = result.data[0];
                console.log(readings);
                aqiResult.textContent = readings.aqi !== undefined ? readings.aqi : 'N/A';
                coResult.textContent = readings.co !== undefined ? readings.co : 'N/A';
                no2Result.textContent = readings.no2 !== undefined ? readings.no2 : 'N/A'; // Explicit check
                pm2Result.textContent = readings.pm25 !== undefined ? readings.pm25 : 'N/A';
                o3Result.textContent = readings.o3 !== undefined ? readings.o3 : 'N/A';
                pm10Result.textContent = readings.pm10 !== undefined ? readings.pm10 : 'N/A';
                so2Result.textContent = readings.so2 !== undefined ? readings.so2 : 'N/A';
                resultContainer.style.display = 'flex';
            } else {
                throw new Error('No data available for the provided coordinates.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        });
});
