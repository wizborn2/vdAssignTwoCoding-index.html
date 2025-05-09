const sundial = document.getElementById('sundial');
const selectTimezone = document.getElementById('timezone');

//a function to create hour lines- conditional loop for loop lines and create each hour line and position it
function hourLinesDraw(){
    for (let i = 0; i < 12; i++){
        const angle = i * 30;


        //To create the hour line
        const clockLine = document.createElement('div');
        clockLine.className = 'hour-line';
        clockLine.style.transform = `translateX(-50%) rotate(${i * 30}deg)`;//using *15 will make the clock dense
        sundial.appendChild(clockLine);

        //To create the hour number:
        const clockNumber = document.createElement('div');
        clockNumber.className = 'hour-number';//
        clockNumber.textContent = i === 0? '12' : i;
        clockNumber.style.transform = `rotate(${angle}deg) translateY(-165px) rotate(${-angle}deg)`;
        sundial.appendChild(clockNumber);//appendChild allows for addition of a new child node.
    }
}
//To calculate shadow angle based on time using a function and apply gnomon angle
function gnomonAngleUpdate(offset = 0){
    const gnomon = document.getElementById('gnomon');
    const date = new Date();//mdn
    const utcHour = date.getUTCHours();//mdn
    const minutes = date.getUTCMinutes();//mdn
    const localHour = utcHour + parseFloat(offset);
    const angle = ((localHour % 12) + minutes/60) * 30;
    //controls the shadow angle
    gnomon.style.transform = `translate(-50%, -100%) rotate(${angle - 90}deg)`;
}

//Desmonstrating the use of an object to store time zone offsets
const timezones = {
    "0": "UTC",
    "-5": "EST",
    "-8": "PST",
    "1": "CET",
    "5.5": "IST",
    "-4": "EDT"
};

//This updates sundial every minute
setInterval(() => {
    const offset = selectTimezone.value;
    gnomonAngleUpdate(offset);
}, 60000);

//To change gnomon angle when timezone is changed
selectTimezone.addEventListener('change', () => {
    const selected = selectTimezone.value;
    localStorage.setItem('preferredTimezone', selected);//mdn
    gnomonAngleUpdate(selected);
});


//To load saved timezone on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTimezone = localStorage.getItem('preferredTimezone');
    if (savedTimezone && timezones.hasOwnProperty(savedTimezone)){//mdn
        selectTimezone.value = savedTimezone;
    }
    gnomonAngleUpdate(selectTimezone.value);
});

//To add the 'reset to default' button
document.getElementById('resetTimezone').addEventListener('click', () =>{
    localStorage.removeItem('preferredTimezone');
    selectTimezone.value = '0';
    gnomonAngleUpdate('0');
});


//To initialise hourLineDraw
hourLinesDraw();
gnomonAngleUpdate(selectTimezone.value);