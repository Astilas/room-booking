// transform regular date into for example: 07/04/2020

export default function checkTodayDate(){
    let date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    let day = date.getDate();
    if (day < 10) date = `0${day}`;
    const todayDate = `${year}-0${month}-${day}`;
    return todayDate;
}