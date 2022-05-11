const wrapper = document.querySelector(".weather-data"),
inputpart = document.querySelector(".input-part"),
inputField = inputpart.querySelector("input"),
locationBtn = inputpart.querySelector("button");
let api;
const apiKey = "d66509e2ed85bc99e3fb95ba6d7759b8";
function geoloc(){
   if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onSuccess,onError);
   }else{
       alert("Your browser does not support geoloaction api");
   }
}
function onSuccess(position){
    const {latitude,longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    fetchData();
}
function onError(error){
    alert("Current Location is blo");
}
locationBtn.addEventListener("click", () =>{
    requestApi(inputField.value);
});
inputField.addEventListener("keyup", e => {
    if(e.key == "Enter" && inputField != ""){
        requestApi(inputField.value);
    }
   
});
function requestApi(city){
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}
function fetchData(){
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}
function weatherDetails(info){
    if(info.cod == "404"){
        alert("City not found.")
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description,id} = info.weather[0];
        const{temp, humidity,pressure} = info.main;
        const {speed} = info.wind;
        const {all} = info.clouds;
        if(info.clouds.all >= 55){
            
        }
        wrapper.querySelector(".location .location-label").innerText = city;
        wrapper.querySelector(".temperature .temper").innerText = temp;
        wrapper.querySelector(".temperature .humid").innerText = humidity;
        wrapper.querySelector(".param .wind").innerText = speed;
        wrapper.querySelector(".param .cloud").innerText = all;
        wrapper.querySelector(".param .press").innerText = pressure;
    }
    console.log(info);
}
