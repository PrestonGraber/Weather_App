const wrapper = document.querySelector(".weather-data"),
inputpart = document.querySelector(".input-part"),
inputField = inputpart.querySelector("input"),
locationBtn = inputpart.querySelector("button");

const apiKey = "d66509e2ed85bc99e3fb95ba6d7759b8";
function geoloc(){
   if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onSuccess,onError);
   }else{
       alert("Your browser does not support geoloaction api");
   }
}
function onSuccess(position){
    console.log(position);
}
function onError(error){
    alert("Current location is blocked, please allow location or simply use search bar.");
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
function weatherDetails(info){
    console.log(info);
}
