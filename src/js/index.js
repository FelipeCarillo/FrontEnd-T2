function getCoordinates() {
    document.getElementById("submit").innerHTML = 'Buscando <i class="fa-solid fa-spinner fa-spin-pulse"></i>';
    let city = document.getElementById("city").value;
    let endpoint = "http://localhost:3000/city";
    let data = { city };
    fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.json();
    }).then(data => {
        if (data.statusCode == 404) {
            alert("Cidade não encontrada");
            document.getElementById("submit").innerHTML = "Buscar";
            return;
        }
        if (data.statusCode == 200) {
            let lat = data.lat;
            let lon = data.lon;
            let city = data.city;
            getWeather(lat, lon, city)
        }

    }).catch(error => {
        console.log("Error" + error);
    });
}

function getWeather(lat, lon, city) {
    let endpoint = `http://localhost:3000/weather?lat=${lat}&lon=${lon}`;
    fetch(endpoint).then(response => {
        return response.json();
    }).then(data => {
        let feels_like = (data.feels_like - 273.15).toFixed(2) + "°C";
        let description = data.description.charAt(0).toUpperCase() + data.description.slice(1);
        document.getElementById("submit").innerHTML = "Buscar";
        document.getElementById("lat").innerHTML = lat;
        document.getElementById("lon").innerHTML = lon;
        document.getElementById("feels_like").innerHTML = feels_like;
        document.getElementById("city_name").innerHTML = city;
        document.getElementById("description").innerHTML = description;
        console.log("Latitude: " + lat + "\nLongitude: " + lon);
        console.log("\nCity: " + city + "Feels like: " + feels_like + "\nDescription: " + description);
    });
}

function clearResponses() {
    document.getElementById("lat").innerHTML = "Latitude";
    document.getElementById("lon").innerHTML = "Longitude";
    document.getElementById("feels_like").innerHTML = '<i class="fa-solid fa-cloud fa-bounce" style="color: #727272;">°C</i>';
    document.getElementById("description").innerHTML = "";
    document.getElementById("city_name").innerHTML = "";
}