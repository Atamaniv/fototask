export function format(date: Date) {
    date = new Date(date);
    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    return day + '-' + month + '-' + year;
}