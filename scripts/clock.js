// To get the hour, minutes, seconds
function updateClock(){//mdn
    const now = new Date();
    const hours = String(now.getHours()).padStart(2,'0');//To convert single time digit to two
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
     
    //This creates the string e.g  12:01:05
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').textContent = timeString;    
}
//setInterva updates the clock div to the current time
setInterval(updateClock, 1000);
updateClock(); //This runs the code