export const formatTime = (input: number): string => {
    const hours = Math.floor(input / 3600);
    const minutes = Math.floor((input - (3600 * hours)) / 60);
    const seconds = input - (3600 * hours) - (60 * minutes);

    return [
        hours,
        minutes,
        seconds
    ].map(entry => entry.toString())
        .map(entry => entry.padStart(2, '0'))
        .join(':');
}
