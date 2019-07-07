window.addEventListener("load", () =>{
   let lat;
   let long;
   let temperatureDescription = document.querySelector('.temperature-description');
   let temperatureDegree = document.querySelector('.temperature-degree');
   let locationTimezone = document.querySelector('.location-timezone');
   let degreeSection = document.querySelector('.degree-section');
    let degreeSectionSpan = document.querySelector('.degree-section span');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/2c8ddf82f8e023b01aeb5292f9508b4f/${lat},${long}`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;
                    // Setting DOM elements
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    // conversion
                    let celsius = (temperature-32)*(5/9);
                    setIcons(icon,document.querySelector('.icon'));
                    // change temperature scale
                    degreeSection.addEventListener('click', () => {
                        if(degreeSectionSpan.textContent === "F"){
                            degreeSectionSpan.textContent = "C";
                            temperatureDegree.textContent = JSON.stringify(Math.floor(celsius));
                        }
                        else
                        {
                            degreeSectionSpan.textContent = "F";
                            temperatureDegree.textContent = JSON.stringify(temperature);
                        }
                    })


                });
        });
    }
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
        
    }
});
