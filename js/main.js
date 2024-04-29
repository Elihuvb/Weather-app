let dataContainer = document.querySelector(".data-container");
let weekContainer = document.querySelector(".week-container");
let hourContainer = document.querySelector(".hour-container");

const getData = async () => {
    let peticion = await fetch(
        "http://api.weatherapi.com/v1/forecast.json?key=658fed0daa3b464193c154801242704&q=Córdoba, Argentina&days=7&aqi=no&alerts=no"
    );
    let data = await peticion.json();

    console.log(data)
    // console.log(data.current.condition);
    let div = document.createElement("DIV");
    div.classList.add("datos");
    div.innerHTML = `
    <img src="${data.current.condition.icon}" class="img-data">
    <div class="data-cont">
        <p class="data">Condition: </p>
        <span class="data-cont-p">${data.current.condition.text}</span><br>
        <p class="data">Country: </p>
        <span class="data-cont-p">${data.location.country}</span><br>
        <p class="data">Region: </p>
        <span class="data-cont-p">${data.location.region}</span><br>
        <p class="data">Local time: </p>
        <span class="data-cont-p">${data.location.localtime}</span><br>
        <p class="data">Temp: </p>
        <span class="data-cont-p">${data.current.temp_c}º</span><br>
        <p class="data">Feels like: </p>
        <span class="data-cont-p">${data.current.feelslike_c}º</span><br>
    </div>
    `;
    dataContainer.appendChild(div);

    for (let i = 0; i < 24; i++) {
        let div3 = document.createElement("DIV");
        div3.classList.add("hour");
        div3.innerHTML = `
        <p class="data-hour">${data.forecast.forecastday[0].hour[i].time}</p>
        <img src="${data.forecast.forecastday[0].hour[i].condition.icon}" class="img-hour">
        <div class="data-hour-cont">
            <p class="data-hour">${data.forecast.forecastday[0].hour[i].condition.text}</p>
            <p class="data-hour">${data.forecast.forecastday[0].hour[i].temp_c}º</p>
        </div>
        `;
        hourContainer.appendChild(div3)
    }

    for (let x = 0; x < 7; x++) {
        let daily = document.createElement("DIV");
        daily.classList.add("week");
        daily.innerHTML = `
        <img src="${data.forecast.forecastday[x].day.condition.icon}" class="img-week"><br>
        <div class="data-week-cont">
            <p class="data-week">${data.forecast.forecastday[x].date}</p><br>
            <p class="data-week">${data.forecast.forecastday[x].day.condition.text}</p><br>
            <p class="data-week">${data.forecast.forecastday[x].day.mintemp_c}º / ${data.forecast.forecastday[x].day.maxtemp_c}º</p>
        </div>
        `
        weekContainer.appendChild(daily);
    }
}

getData();

// how to get the date hour from a API with javascript?
