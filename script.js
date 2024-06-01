// Salutation
let salutation = document.getElementById("displayGreeting");

if (new Date().getHours() < 12) {
    salutation.innerHTML = "Good Morning 😊"
}
  
else if (new Date().getHours() < 16) { 
    salutation.innerHTML = "Good Afternoon 🌞"
}
    
else {
        salutation.innerHTML = "Good Evening 🌙"
};

// Weather & API
const apiKey = "b2c5830f9322f0830a6ef1df22547ed0"; // Do not use my api key
const apiURL = "http://api.openweathermap.org/data/2.5/weather?";

let form = document.querySelector("form");
let inputLocation = document.getElementById("inputLocation");
let searchIcon = document.querySelector(".fa-search");

async function getWeatherInfo() {

    try {

        const searchWeather = await fetch(apiURL + `&appid=${apiKey}` + `&q=` + inputLocation.value + `&units=metric`); //Parameters for the api
        const weatherData = await searchWeather.json();
    
        document.getElementById("cityName").innerHTML = weatherData.name + ","
        document.getElementById("country").innerHTML = weatherData.sys.country
        document.getElementById("flag").src = "https://flagsapi.com/"+weatherData.sys.country+"/flat/32.png"

        document.getElementById("temperature").innerHTML = weatherData.main.temp
        document.getElementById("min-temp").innerHTML = weatherData.main.temp_min
        document.getElementById("max-temp").innerHTML = weatherData.main.temp_max

        document.querySelector(".description").innerHTML = weatherData.weather[0].description
        document.querySelector(".feels-like").innerHTML = weatherData.main.feels_like

        // Weather Date Format Start
        let daysOfTheWeek; switch (new Date().getDay()) {
            case 0:
                daysOfTheWeek = "Sunday,";
                break;

                case 1:
                    daysOfTheWeek = "Monday,";
                    break;

                    case 2:
                        daysOfTheWeek = "Tuesday,";
                        break;

                        case 3:
                            daysOfTheWeek = "Wednesday,";
                            break;

                            case 4:
                                daysOfTheWeek = "Thursday,";
                                break;

                                case 5:
                                    daysOfTheWeek = "Friday,";
                                    break;

                                    case 6:
                                        daysOfTheWeek = "Saturday,";
                                        break;
        };
        let month; switch(new Date().getMonth()) {
            case 0:
                month = "January"
                break;

                case 1:
                    month = "February"
                    break;

                    case 2:
                        month = "March"
                        break;

                        case 3:
                            month = "April"
                            break;

                            case 4:
                                month = "May"
                                break;

                                case 5:
                                    month = "June"
                                    break;

                                    case 6:
                                        month = "July"
                                        break;

                                        case 7:
                                            month = "August"
                                            break;

                                            case 8:
                                                month = "September"
                                                break;

                                                case 9:
                                                    month = "October"
                                                    break;

                                                    case 10:
                                                        month = "November"
                                                        break;

                                                        case 11:
                                                            month = "December"
                                                            break;
        }
        let date = new Date().getDate()
        let year = new Date().getFullYear()
        document.getElementById("date").innerHTML = daysOfTheWeek +" " + date + " " + month +" " + year
        //Weather Date Format End

        document.getElementById("cloud-img").src = "https://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@4x.png"

        document.getElementById("humidity").innerHTML = weatherData.main.humidity + "%"
        document.getElementById("pressure").innerHTML = weatherData.main.pressure + "hPa"
        document.getElementById("wind-speed").innerHTML = weatherData.wind.speed + "Km/hr"
        document.getElementById("cloud").innerHTML = weatherData.clouds.all + "%"

        inputLocation.value = ""; // Clears the input tag for another text
    }

    catch {
            
        const htmlTag = document.querySelector("html")
        const errorElement = document.createElement("div")
        htmlTag.appendChild(errorElement)
        htmlTag.style.backgroundColor="black"
                
        errorElement.style.color="#87CEEB"
        errorElement.classList.add("container-fluid")

        errorElement.innerHTML = `
            <div class="js-container-element container d-flex-column justify-content-center align-content-center">

                <div class="d-flex justify-content-center mb-3">
                    <img src="Images/logo.png" alt="Img" class="img-fluid" style="width: 50px; height: 50px;">
                </div>
                <p class="text-center">Something went wrong</p>
                <p class="text-center">Refresh the page</p>
            </div>
        `
        document.querySelector("body").style.display="none" // removes the body tag in html
    } //Error message to run incase of any issue
}

form.addEventListener("submit",
    
    (event) => {

        event.preventDefault()
        getWeatherInfo()
    }
); // Calling 1 via enter key

searchIcon.addEventListener("click",
    () => {getWeatherInfo()}
); // Calling 2 via font-awesome search icon

// Default Weather Info
function defaultWeatherInfo() {
    inputLocation.value = "London";
    getWeatherInfo()
    inputLocation.value = ""; // Clears the default text (london) from the input tag
}
defaultWeatherInfo()