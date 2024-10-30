const getCurrentDate = () => {
    let now = new Date();

    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();

    // Date - Two digits format
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    return `${day}.${month}.${year}`;
}

export default getCurrentDate