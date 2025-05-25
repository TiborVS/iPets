export default function ISODateToSloveneString(ISODate) {
    let date = ISODate.split('-');
    let months = {
        "01": "januarja",
        "02": "februarja",
        "03": "marca",
        "04": "aprila",
        "05": "maja",
        "06": "junija",
        "07": "julija",
        "08": "avgusta",
        "09": "septembra",
        "10": "oktobra",
        "11": "novembra",
        "12": "decembra"
    };
    let day;
    if (date[2][0] == '0') day = date[2][1];
    else day = date[2];
    let month = months[date[1]];
    let year = date[0];
    return day + ". " + month + " " + year;
}
