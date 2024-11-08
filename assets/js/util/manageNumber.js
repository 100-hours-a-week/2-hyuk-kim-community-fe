export default function updateNumberForm(number) {
    if (number >= 1000) {
        return '1k';
    } else if (number >= 10000) {
        return '10k';
    } else if (number >= 100000) {
        return '100k';
    } else {
        return number;
    }
}
