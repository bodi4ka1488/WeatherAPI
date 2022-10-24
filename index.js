
   

let url1 = "http://api.openweathermap.org/data/2.5/weather?id=703448&appid=bf35cac91880cb98375230fb443a116f";
let url2 = "http://api.openweathermap.org/data/2.5/weather?id=2643743&appid=bf35cac91880cb98375230fb443a116f";
let url3 ="http://api.openweathermap.org/data/2.5/weather?id=5128638&appid=bf35cac91880cb98375230fb443a116f";

let Kyiv = document.querySelector("#Kyiv");
let kyivFoto = document.querySelector(".photoKyiv");
let descriptionKyiv = document.querySelector("#descriptionKyiv");
let degreseKyiv = document.querySelector(".degreseKyiv");
let elements1 = document.querySelectorAll(".info1");
let windDirection1 = document.querySelectorAll(".windDirection1");




let london = document.querySelector("#london");
let londonFoto = document.querySelector(".photoLondon");
let descriptionLondon = document.querySelector("#descriptionLondon");
let degreseLondon = document.querySelector(".degreseLondon")
let elements2 = document.querySelectorAll(".info2");
let windDirection2 = document.querySelectorAll(".windDirection2");



let newYork = document.querySelector("#NewYork");
let yorkFoto = document.querySelector(".photoNewYork");
let descriptionYork = document.querySelector("#descriptionNewYork");
let degreseYork = document.querySelector(".degreseNewYork")
let elements3 = document.querySelectorAll(".info3");
let windDirection3 = document.querySelectorAll(".windDirection3");


    function createIn(url, picture,countryName,description,degrese,arr,div){
        let promise1 = fetch(url)
        promise1
            .then(response => response.json())
            .then(json => {
                let foot = document.querySelector(".footer")
                let btn = document.querySelectorAll(".btn");
                let img1 = 'http://openweathermap.org/img/wn/' + json.weather[0].icon+'@2x.png';
                picture.style.backgroundImage = `url(${img1})`;
                countryName.innerHTML = json.name;
                description.innerHTML = json.weather[0].description;
                degrese.innerHTML = temperatureCelsium(json.main.temp);
                for (const iterator of div) {
                    console.log(iterator);
                    iterator.style.transform = 'rotate(' + json.wind.deg + 'deg)';
                }
                console.log();
                foot.addEventListener("mousedown", (e)=>{
                    if(e.target == btn[0]){
                        degrese.innerHTML = temperatureCelsium(json.main.temp);
                        btn[0].style.backgroundColor = "#df5c5c"
                        btn[1].style.backgroundColor = ""
                    }
                    else if(e.target == btn[1]){
                        degrese.innerHTML = temperatureFarengate(json.main.temp);
                        btn[1].style.backgroundColor = "#df5c5c"
                        btn[0].style.backgroundColor = ""
                        
                    }
                })
                arr[0].innerHTML += `Humidity ${json.main.humidity}  %` ;
                arr[1].innerHTML += `Wind speed : ${json.wind.speed}`;
                arr[2].innerHTML += `Wind direction : ${json.wind.deg} ° `;
                arr[2].style.flexDirection = "column-reverse"
                arr[3].innerHTML += `Sunrise : ${convertTime(json.sys.sunrise, json.timezone)} `;
                arr[4].innerHTML += `Sunset : ${convertTime(json.sys.sunset, json.timezone)} `;
              
            });
    }
    let kyiv = createIn(url1,kyivFoto,Kyiv,descriptionKyiv,degreseKyiv,elements1, windDirection1);
    let lon = createIn(url2,londonFoto,london,descriptionLondon ,degreseLondon,elements2, windDirection2);
    let york = createIn(url3,yorkFoto,newYork,descriptionYork,degreseYork,elements3,windDirection3)

    document.querySelector(".main").addEventListener("mouseover", function(e){
        let target = e.target;
        let menu = document.querySelectorAll(".elementsSubMenu");
        if (target.className == "material-symbols-outlined open1" ){
            menu[0].style.display = "flex"
        }
        if (target.className == "material-symbols-outlined open2" ){
            menu[1].style.display = "flex"
        }
        if (target.className == "material-symbols-outlined open3"){
            menu[2].style.display = "flex"
        }
        
    })
    document.addEventListener("mouseout", function(e){
        let menu = document.querySelectorAll(".elementsSubMenu");
        for (const elem of menu) {
        elem.style.display = "none"
        }
    })
    function convertTime(unixTime, timezone) {
        let timezoneOffset = new Date().getTimezoneOffset() * 60;
        let date = new Date((unixTime + timezoneOffset + timezone) * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let time = hours + ":" + minutes.slice(-2);
        return time;
    }
    function temperatureCelsium(valNum) {
       let x = valNum - 273.15;
        let num = x.toFixed(2)
        return num + " °C";
      }
    function temperatureFarengate(valNum) {
        let x = ((valNum-273.15)*1.8)+32
        let num = x.toFixed(2)
        return num + " °F"
      }
    

    

