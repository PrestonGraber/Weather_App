const wrapper = document.querySelector(".weather-data"),
inputpart = document.querySelector(".input-part"),
inputField = inputpart.querySelector("input"),
locationBtn = inputpart.querySelector("button");

wIcon = document.querySelector(".weather-img img");
const element = document.querySelector(".container");

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
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
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
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
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

        const {description,id} = info.weather[0];
        const{temp, humidity,pressure} = info.main;
        const {speed} = info.wind;
        const {all} = info.clouds;
        const {sunrise,sunset} = info.sys;
        let dateObj = new Date(sunrise * 1000);
        let dateObj2 = new Date(sunset * 1000);
 
        // Get hours from the timestamp
        let hours = dateObj.getUTCHours()-4;
        let hours2 = dateObj2.getUTCHours()+8;
        // Get minutes part from the timestamp
        let minutes = dateObj.getUTCMinutes();
        let minutes2 = dateObj2.getUTCMinutes();
        
        let formattedTime = hours.toString().padStart(2, '0') + ':' + 
                minutes.toString().padStart(2, '0') + ':' ;

        let formattedTime2 = hours2.toString().padStart(2, '0') + ':' + 
                minutes2.toString().padStart(2, '0') + ':' ;
       

        if(id == 800){
            wIcon.src = "photos/clear.png";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "photos/storm.png";
            document.getElementsByClassName('container')[0].style.backgroundImage="url(photos/background-night.webp)";
        }
        else if(id >= 600 && id <= 622){
            wIcon.src = "photos/snow.png";
        }
        else if(id >= 701 && id <= 781){
            wIcon.src = "photos/haze.png";
        }
        else if(id >= 801 && id <= 804){
            wIcon.src = "photos/cloud.png";
           
        }
        else if((id >=300 && id<=321) || (id >=500 && id <= 531)){
            wIcon.src = "photos/storm.png"
        }
        wrapper.querySelector(".location .location-label").innerText = city;
        wrapper.querySelector(".temperature .temper").innerText = Math.floor(temp);
        wrapper.querySelector(".temperature .humid").innerText = humidity;

        wrapper.querySelector(".future .time").innerText = formattedTime;
        wrapper.querySelector(".future .time-night").innerText = formattedTime2;

        wrapper.querySelector(".param .wind").innerText = speed;
        wrapper.querySelector(".param .cloud").innerText = all;
        wrapper.querySelector(".param .press").innerText = pressure;
    }
    console.log(info);
}
