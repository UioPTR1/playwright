export const addDays = (date: Date, amountOfDays: number): Date => {
    const newDate = new Date(date.valueOf());
    newDate.setDate(date.getDate() + amountOfDays)
    return newDate;
}

export const formatDate = (date: Date): string => {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return month + '/' + day + '/' + year;
}