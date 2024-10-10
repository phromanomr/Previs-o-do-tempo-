const apiKey = "9d0c4e01563a3a32ff407c89758f487b";
const apiCountryURL = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");
const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const suggestionButtons = document.querySelectorAll("#suggestions button");

const toggleLoader = () => {
  loader.classList.toggle("hide");
};

// Função para obter dados do clima
const getWeatherData = async (city) => {
  toggleLoader();
  
  try {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    
    toggleLoader();
    return data;
  } catch (error) {
    toggleLoader();
    showErrorMessage("Erro ao buscar dados do clima.");
    console.error(error);
  }
};

// Exibir mensagem de erro
const showErrorMessage = (message) => {
  errorMessageContainer.textContent = message;
  errorMessageContainer.classList.remove("hide");
};

// Ocultar informações
const hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");
};

// Exibir os dados do clima
const showWeatherData = async (city) => {
  hideInformation();
  
  const data = await getWeatherData(city);
  
  if (!data || data.cod === "404") {
    showErrorMessage("Cidade não encontrada.");
    return;
  }

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
  countryElement.setAttribute("src", apiCountryURL + data.sys.country);
  umidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed} km/h`;

  document.body.style.backgroundImage = `url("/img/pexels-photo-1815398.jpeg")`;
  weatherContainer.classList.remove("hide");
};

// Evento de busca
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    showWeatherData(city);
  }
});

// Buscar ao pressionar Enter
cityInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const city = e.target.value.trim();
    if (city) {
      showWeatherData(city);
    }
  }
});

// Sugestões de cidades
suggestionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.getAttribute("id");
    showWeatherData(city);
  });
});


// mudar fundo 
 
 