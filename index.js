container = document.querySelector(".container");
searchbox = document.querySelector(".searchbox input");
searchbutton = document.querySelector(".searchbox>button");
image=document.querySelector(".weather-details img");
temprature = document.querySelector(".temp");
weatherdescription = document.querySelector(".weather-description");
humidityvalue = document.querySelector("#humidityvalue");
windvalue = document.querySelector("#windvalue");
error = document.querySelector(".error");
arr=[];

const APIkey="417f14844e7457df50226f9b6bde7fc5";
searchbutton.addEventListener('click',callAPI);
searchbox.addEventListener('keypress',(event)=>{
    if(event.key=="Enter"){
        callAPI();
    }
});
async function callAPI(){
    city=searchbox.value;
    container.classList.add('Margin');
    const APIurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`
    if(city!==""){
        const response= await fetch(APIurl);
        const data = await response.json();
        if(data.cod=="404"){
            container.style.height = "400px";
            error.classList.add("Active");
            document.querySelector(".weather-details").classList.remove('Active');
            document.querySelector(".weather-info").classList.remove('Active');
            return;
        }
        container.style.height = "500px";
        error.classList.remove('Active');
        document.querySelector(".weather-details").classList.add('Active');
        document.querySelector(".weather-info").classList.add('Active');
        arr=Object.entries(data);
        humidityvalue.innerHTML=arr[3][1].humidity+'%';
        temprature.innerHTML=arr[3][1].temp+'<span>°C</span>';
        weatherdescription.innerHTML=arr[1][1][0].main;
        t=arr[5][1].speed;
        windvalue.innerHTML=Math.round(t*10)/10+'Km/h';
        
        switch(arr[1][1][0].main){
            case 'Clear':
                image.src="./weathericons/Clear.png";
                break;
            case 'Clouds':
                image.src="./weathericons/Cloudy.png";
                break;
            case 'Rain':
                image.src="./weathericons/Rain.png";
                break;
            case 'Snow':
                image.src="./weathericons/Snow.png";
                break;
            case 'Mist':
                image.src="./weathericons/Mist.png";
                break;
            case 'Haze':
                image.src="./weathericons/Mist.png";
                break;
            default:
                image.src="./weathericons/Cloudy.png";
                break;
        }
    }
}


