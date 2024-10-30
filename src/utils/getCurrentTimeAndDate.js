const getCurrentTimeAndDate = () => {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();

    // Time - Two digits format
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;

    // Date - Two digits format
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    return `${hours}:${minutes}-${day}.${month}.${year}`;
}

export default getCurrentTimeAndDate